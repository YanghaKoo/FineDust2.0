/* global daum */
import React, { Component } from "react";
import "./DaumMap.scss";
import { withRouter } from "react-router-dom";
import Loading from "components/common/Loading";
// import PlayGround from 'pages/Playground'

class DaumMap extends Component {
  state = {
    toggle: false,
    userInsert: "",
    testdb: [],
    markerLat: null,
    markerLng: null
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
    let mapContainer = document.getElementById("map"),
      mapOption = {
        center: new daum.maps.LatLng(lat, lng),
        level: 3
      };

    const map = new daum.maps.Map(mapContainer, mapOption);

    // 마커 객체 생성
    const marker = new daum.maps.Marker({});
    marker.setMap(map);

    daum.maps.event.addListener(map, "click", mouseEvent => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      this.setState({
        markerLat: latlng.getLat(),
        markerLng: latlng.getLng()
      });
    });
  };

  render() {
    console.log("DaumMap rendered");
    const { toggle } = this.state;

    const btnValue = toggle ? "추가모드 종료" : "좌표 추가하기";

    return (
      <div className="daum-map">
        {/* <PlayGround map={this.map}/> */}
        <div id="map">
          <Loading pageHeight={50} logoWidth={50} />
        </div>

        <div className="user-submit">
          <input
            type="button"
            value={btnValue}
            onClick={this.handleToggle}
            className="add-button"
          />
          {toggle && (
            <div className="popup">
              <input
                type="text"
                value={this.state.userInsert}
                onChange={this.handleChange}
              />
              <input
                type="button"
                onClick={this.handleSubmit}
                value="제출"
                className="submit-button"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(DaumMap);
