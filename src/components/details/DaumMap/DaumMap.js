/* global daum */

import React, { Component } from "react";
import "./DaumMap.scss";
import { withRouter } from "react-router-dom";
import Loading from "components/common/Loading"

class DaumMap extends Component {

  
  componentWillReceiveProps(nextProps){
    console.log(nextProps.change)     // url에서 바뀔 때
    const { infos, match } = nextProps;
    const lat = infos[Number(match.params.id) - 1].lat;
    const lng = infos[Number(match.params.id) - 1].lng;
    this.makeMap(lat,lng)  
  }

  // 현재 지도 중심 좌표 일시저장
  makeMap = (lat, lng) =>{
    let mapContainer = document.getElementById("map"),
    mapOption = {
      center: new daum.maps.LatLng(lat, lng),
      level: 3
    };

  let map = new daum.maps.Map(mapContainer, mapOption);   
  }

  render() {
    console.log("DaumMap")
    return (
      <div className="daum-map">
        <div id="map">
          <Loading pageHeight={50} logoWidth={50}/>
        </div>
      </div>
    );
  }
}

export default withRouter(DaumMap);
