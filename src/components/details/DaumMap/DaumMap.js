/* global daum */

import React, { Component } from "react";
import "./DaumMap.scss";
import { withRouter } from "react-router-dom";
import Loading from "components/common/Loading";
import axios from "axios";
import DjangoCSRFToken from "django-react-csrftoken";

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

class DaumMap extends Component {
  state = {
    toggle: false,

    userInsert: "",
    markerLat: null,
    markerLng: null,

    parkToggle: true,
    parkMarkers: null,

    userParkToggle: true,
    clusterer: null,
    UIparkMarkers: null,

    token: false,
    loading: false,
    testdb: []
  };

  // 공원 위치 가져
  positions = [];
  marker = null;
  map = null;

  componentDidMount() {
    const { infos, match } = this.props;
    const lat = infos[Number(match.params.id) - 1].lat;
    const lng = infos[Number(match.params.id) - 1].lng;
    this.makeMap(lat, lng, 5);
  }

  componentWillReceiveProps(nextProps) {
    const {nowGu, userInputParks } = this.props

    // nowGu 바뀌는걸론 리렌더링 하지않게
    if (nowGu !== nextProps.nowGu) return;

    // 새로운 userInputParks가 생기면 그 지점일 기준으로 makemap, 아니면 기존 makemap
    if (userInputParks !== nextProps.userInputParks) {
      
      // 유저가 찍는 마커 지우고 새로 clickable한 마커 생성
      console.log(userInputParks, nextProps.userInputParks)
      this.marker.setMap(null);
      this.setState({
        markerLat: null,
        markerLng: null
      });
      
      const marker = new daum.maps.Marker({});
      marker.setMap(this.map);
      daum.maps.event.addListener(this.map, "click", mouseEvent => {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);

        this.marker = marker;
        this.setState({
          markerLat: latlng.getLat(),
          markerLng: latlng.getLng()
        });
      });

      // 새로 입력된 유저인풋 파크로 지도의 중심이 옮겨져 가게
      const { lat, lng } = nextProps.userInputParks[
        nextProps.userInputParks.length - 1
      ];            
      this.makeMap(Number(lat), Number(lng), 5);
    } 
    else {      
      const { infos, match } = nextProps;
      const lat = infos[Number(match.params.id) - 1].lat;
      const lng = infos[Number(match.params.id) - 1].lng;      
      this.makeMap(lat, lng, 5);
    }
  }

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  handleChange = e => {
    this.setState({
      userInsert: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault()
    const { markerLat, markerLng, userInsert } = this.state;
    
    // for 장고 토큰
    const csrf = e.target.csrfmiddlewaretoken.value;

    if (!(markerLat && markerLng && userInsert)) {
      alert("Marker가 찍히지 않았거나 내용이 입력되지 않았습니다.");
      return;
    } else if (userInsert.length >= 15) {
      alert("입력 내용이 15자 이상입니다.");
      return;
    }

    try {
      const submit = await axios.post(
        "/app01/start_app/data_user_park",
        {
          lat: markerLat,
          lng: markerLng,
          gu: this.props.nowGu,
          user_comment: this.state.userInsert
        },
        {
          headers: {
            "X-CSRFToken": csrf
          }
        }
      );
      console.log(submit);
      
      // 추가된 새로운 userInputPark까지 지도에 표시하기 위해서
      this.props.ParkActions.getUserInputPark()
    } catch (e) {
      console.log(e);
    }

    // 아래 testdb
    const datas = {
      lat: markerLat,
      lng: markerLng,
      userInput: this.state.userInsert,
      gu: this.props.nowGu
    };

    this.setState(
      {
        testdb: this.state.testdb.concat(datas),
        userInsert: "",
        toggle: false
      },
      () => {
        console.log(this.state.testdb);

        // TODO : 제보한게 등록 제대로 되는지 확인
        this.props.ParkActions.getUserInputPark();
        //alert("알려주셔서 감사합니다!");
      }
    );
  };

  makeParkInfoWindow = park => {
    return {
      title: park.p_nm,
      latlng: new daum.maps.LatLng(Number(park.lat), Number(park.lng)),
      content: `<div style="border-radius : 20px;"><img src=${
        park.p_img
      } alt="" width="230px"/>
    <div style="width : 230px; text-align : center; font-weight : 800;">${
      park.p_nm
    }</div>
    <div style="text-align : center;">${
      park.p_address.length >= 17
        ? park.p_address.slice(0, 17) + "..."
        : park.p_address
    }</div>    
    </div>    
    `
    };
  };

  handleParkMarker = () => {
    const { parkToggle, parkMarkers, clusterer } = this.state;
    const { nowGu, parks } = this.props;

    
    if(parkToggle){
      clusterer.removeMarkers(parkMarkers)
    }else{
      clusterer.addMarkers(parkMarkers);
    }
    

    this.setState(
      {
        parkToggle: !this.state.parkToggle
      },
      () => {        
        if (parkToggle) {          
          parks.forEach(park => {
            // 이 if문이 해당 구의 공원 정보만 가져오는 것            
            if (park.p_address.match(nowGu)) {
              // 중복 방지
              if (this.positions.find(item => item.title === park.p_nm)) return;
              this.positions.push(this.makeParkInfoWindow(park));
            }
          });
        }

        this.setState({
          token: !this.state.token
        });
      }
    );
  };

  handleUserParkMarker = () => {
    const { userParkToggle, UIparkMarkers, clusterer } = this.state;
    userParkToggle
      ? clusterer.removeMarkers(UIparkMarkers)
      : clusterer.addMarkers(UIparkMarkers);

    this.setState({
      userParkToggle: !this.state.userParkToggle
    });
  };

  // handleKeyPress = e => {
  //   if(e.key === "Enter") this.handleSubmit();
  // };

  // 현재 지도 중심 좌표 일시저장
  makeMap = (lat, lng, level) => {
    const { parks, nowGu, userInputParks } = this.props;

    const mapContainer = document.getElementById("map"),
      mapOption = {
        center: new daum.maps.LatLng(lat, lng),
        level: level
      };
    const map = new daum.maps.Map(mapContainer, mapOption);

    // 클러스터러 시작
    const clusterer = new daum.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 1
    });

    // 유저가 찍을 마커 객체 생성
    const marker = new daum.maps.Marker({});
    marker.setMap(map);
    this.marker = marker;
    this.map = map;

    // 공원 마커정보 표시
    // const positions = [];

    parks.forEach(park => {
      // 이 if문이 해당 구의 공원 정보만 가져오는 것
      if (park.p_address.match(nowGu)) {
        // 중복 방지
        if (this.positions.find(item => item.title === park.p_nm)) return;
        this.positions.push(this.makeParkInfoWindow(park));
      }
    });

    //    console.log(this.positions)

    const parkMarkerImage =
      "https://image.flaticon.com/icons/svg/406/406544.svg";

    // 인포윈도우 열고 닫기 클로져
    function makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    }
    function makeOutListener(infowindow) {
      return function() {
        infowindow.close();
      };
    }
    const imageSize = new daum.maps.Size(50, 65);
    const markerImage = new daum.maps.MarkerImage(parkMarkerImage, imageSize);

    // 공원 표시 마커들
    if (this.state.parkToggle) {
      const parkMarkers = this.positions.map(position => {
        const infowindow = new daum.maps.InfoWindow({
          content: position.content // 인포윈도우에 표시할 내용
        });

        const newMarker = new daum.maps.Marker({
          image: markerImage,
          map: map,
          position: position.latlng,
          title: position.title
        });

        daum.maps.event.addListener(
          newMarker,
          "mouseover",
          makeOverListener(map, newMarker, infowindow)
        );
        daum.maps.event.addListener(
          newMarker,
          "mouseout",
          makeOutListener(infowindow)
        );
        return newMarker;
      });
      clusterer.addMarkers(parkMarkers);

      this.setState({
        clusterer,
        parkMarkers
      });
    }

    // userInputParks 좌표 찍기

    if (this.state.userParkToggle) {
      const userMarkerImageUrl =
        "https://image.flaticon.com/icons/svg/201/201916.svg";
      const userMarkerImage = new daum.maps.MarkerImage(
        userMarkerImageUrl,
        imageSize
      );

      const userInputParksMarker = userInputParks.map(r => {
        const markerPosition = new daum.maps.LatLng(
          Number(r.lat),
          Number(r.lng)
        );

        const infowindow = new daum.maps.InfoWindow({
          content: `<div style="text-align : center; width : 200px;">${
            r.user_comment
          }</div>` // 인포윈도우에 표시할 내용
        });

        const marker = new daum.maps.Marker({
          map: map,
          position: markerPosition,
          title: r.user_comment,
          image: userMarkerImage
        });
        daum.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );
        daum.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );

        // marker.setMap(map);
        return marker;
      });
      clusterer.addMarkers(userInputParksMarker);

      this.setState({
        clusterer,
        UIparkMarkers: userInputParksMarker
      });
    }

    // 지도에 클릭하면 사용자 등록 마커나오기
    daum.maps.event.addListener(map, "click", mouseEvent => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      this.setState({
        markerLat: latlng.getLat(),
        markerLng: latlng.getLng()
      });
    });

    // 지도 중심 좌표 기준으로 구 군 찾기
    daum.maps.event.addListener(map, "center_changed", () => {
      const center = map.getCenter();
      const lng = center.getLng();
      const lat = center.getLat();

      try {
        new daum.maps.services.Geocoder().coord2Address(
          lng,
          lat,
          (result, status) => {
            if (result[0] && status === daum.maps.services.Status.OK) {
              if (!result[0].address) {
                console.log("exception handle success");
                return;
              }

              const { LatlngActions, nowGu } = this.props;
              const { region_2depth_name: gu } = result[0].address;

              if (nowGu !== gu) {
                LatlngActions.changeNowGu(gu);
                parks.forEach(park => {
                  // 이 if문이 해당 구의 공원 정보만 가져오는 것
                  if (park.p_address.match(nowGu)) {
                    // 중복 방지
                    if (this.positions.find(item => item.title === park.p_nm))
                      return;

                    this.positions.push(this.makeParkInfoWindow(park));
                    this.makeMap(lat, lng, map.getLevel());
                  } // if문
                });
              }
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    });
  };

  render() {
    const { toggle, userParkToggle, parkToggle } = this.state;

    const btnValue = toggle ? "추가모드 종료" : "공원 제보하기";
    const parkBtnValue = parkToggle ? "일반 공원 숨기기" : "일반 공원 표시하기";
    const userParkBtnValue = userParkToggle
      ? "제보된 공원 숨기기"
      : "제보된 공원 표시하기";
    const userSubmitStyle = toggle ? null : { height: "100px" };

    return (
      <div className="daum-map">
        <div id="map">
          <Loading pageHeight={80} logoWidth={50} />
        </div>

        <div className="user-park-button">
          <div className="input" onClick={this.handleParkMarker}>
            {parkBtnValue}
          </div>
          <div className="input" onClick={this.handleUserParkMarker}>
            {userParkBtnValue}
          </div>
        </div>

        <div className="user-submit" style={userSubmitStyle}>
          <input
            type="button"
            value={btnValue}
            onClick={this.handleToggle}
            className="add button"
          />
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <div className="add-park">
              Location : {this.props.nowGu && this.props.nowGu.slice(0, 4)}
            </div>
            {/* {this.state.markerLat}, {this.state.markerLng} */}
          </div>

          {toggle && (
            <div className="popup">
              <form onSubmit={this.handleSubmit}>
                <DjangoCSRFToken />
                <input
                  type="text"
                  value={this.state.userInsert}
                  onChange={this.handleChange}
                  className="user-insert"
                  placeholder="공원 이름 입력"
                  onKeyPress={this.handleKeyPress}
                />
                <input type="submit" value="제출" className="submit button" />
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(DaumMap);