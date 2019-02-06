/* global daum */
import React, { Component } from "react";
import "./DaumMap.scss";
import { withRouter } from "react-router-dom";
import Loading from "components/common/Loading";

class DaumMap extends Component {
  state = {
    toggle: false,
    userInsert: "",
    testdb: [],
    markerLat: null,
    markerLng: null,
    
    
    
    
  };

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

  handleSubmit = () => {
    const { markerLat, markerLng, userInsert } = this.state;

    if (!(markerLat && markerLng && userInsert)) {
      alert("Marker가 찍히지 않았거나 내용이 입력되지 않았습니다.");
      return;
    }

    const datas = {
      lat: markerLat,
      lng: markerLng,
      comment: this.state.userInsert
    };
    this.setState(
      {
        testdb: this.state.testdb.concat(datas),
        userInsert: "",
        toggle: false
      },
      () => {
        console.log(this.state.testdb);
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    const { infos, match } = nextProps;
    const lat = infos[Number(match.params.id) - 1].lat;
    const lng = infos[Number(match.params.id) - 1].lng;
          
    this.makeMap(lat, lng);
    
  }

  // 현재 지도 중심 좌표 일시저장

  makeMap = (lat, lng) => {
    const { parks, stationname } = this.props;

    // map 만들기
    const mapContainer = document.getElementById("map"),
      mapOption = {
        center: new daum.maps.LatLng(lat, lng),
        level: 5
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

    // 공원 마커정보 표시
    const positions = [];
    parks.forEach(park => {
           
      // 이 if문이 해당 구의 공원 정보만 가져오는 것
      if (park.p_address.match(stationname)) {        
        positions.push({
          title: park.p_nm,
          latlng: new daum.maps.LatLng(Number(park.lat), Number(park.lng)),
          content: `<img src=${park.p_img} alt="" width="200px"/>
        <div style="width : 200px; text-align : center;">${park.p_nm}</div>
        <div>${
          park.p_address.length >= 17
            ? park.p_address.slice(0, 14) + "..."
            : park.p_address
        }</div>        
        `
        });
      }     // if문 
    });

    const parkMarkerImage =
      "//t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

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
    const imageSize = new daum.maps.Size(24, 35);
    const markerImage = new daum.maps.MarkerImage(parkMarkerImage, imageSize);

    const parkMarkers = positions.map(position => {
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
    daum.maps.event.addListener(map, 'center_changed', ()=> {
      const center = map.getCenter()
      const lng  = center.getLng()
      const lat = center.getLat()
      console.log(lat, lng)
      
      new daum.maps.services.Geocoder().coord2Address(lng, lat, (result, status)=> {        

        if(result[0] && status === daum.maps.services.Status.OK) {
          const {stationname, LatlngActions, nowGu} = this.props
          const { region_2depth_name : gu} = result[0].address        
          
          if(stationname !== gu){
            LatlngActions.changeNowGu(gu)
            console.log(nowGu)





          }
        }                        
      })      
    })
  };

  render() {
    console.log("DaumMap rendered");
    const { toggle } = this.state;

    const btnValue = toggle ? "추가모드 종료" : "좌표 추가하기";
    const userSubmitStyle = toggle ? null : { height: "100px" };

    

    return (
      <div className="daum-map">        
        <div id="map">
          <Loading pageHeight={80} logoWidth={50} />
        </div>

        <div className="user-submit" style={userSubmitStyle}>
          <input
            type="button"
            value={btnValue}
            onClick={this.handleToggle}
            className="add button"
          />
          <div style={{ textAlign: "center" }}>
            {this.state.markerLat}
            <br />
            {this.state.markerLng}
          </div>

          {toggle && (
            <div className="popup">
              <input
                type="text"
                value={this.state.userInsert}
                onChange={this.handleChange}
                className="user-insert"
              />
              <input
                type="button"
                onClick={this.handleSubmit}
                value="제출"
                className="submit button"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(DaumMap);
