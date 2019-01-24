/* global daum */

import React, { Component } from "react";
import MessageInput from "./MessageInput";


class Playground extends Component {
  state = {
    previousMarker: null,
    markerLat: null,
    markerLng: null
  };

  // 사용자 공원 추가모드에서 나오기1
  removeAdd = () => {
    if (this.state.previousMarker) {
      this.state.previousMarker.setMap(null);
    }
    document.getElementById("stopAddMode").hidden = true;
    document.getElementById("confirmAddress").hidden = true;
    document.getElementById("startAddMode").disabled = false;
    document.getElementById("inputMessageForm").hidden = true;
    document.getElementById("startAddMode").innerHTML = "누르면 추가 시작";
    this.detachListner(this.clickHandler);
  };

  // 사용자 공원 추가모드에서 나오기2(지도 클릭 리스너 제거)
  detachListner = f => {
    daum.maps.event.removeListener(this.props.map, "click", f);
  };

  // 해당 지역에 comment입력 시작
  confirmAddress = () => {
    this.detachListner(this.clickHandler);
    let targetObj = document.getElementById("inputMessageForm");
    targetObj.hidden = false;
    targetObj.setAttribute("lat", this.state.markerLat);
    targetObj.setAttribute("lng", this.state.markerLng);
    document.getElementById("startAddMode").innerHTML =
      "원하는 메시지를 적어주세요";
    document.getElementById("confirmAddress").hidden = true;
  };

  // DaumMapComponent_MessageInput.js에서 사용(해당 마커에 인포윈도우 설정)
  confirmMarker = message => {
    const marker = this.state.previousMarker;
    const map = this.props.map;
    let infowindow = new daum.maps.InfoWindow({
      content: message
    });
    console.log(this.props.map);
    daum.maps.event.addListener(marker, "mouseover", function() {
      infowindow.open(map, marker);
    });
    daum.maps.event.addListener(marker, "mouseout", function() {
      infowindow.close();
    });
    console.log(marker, typeof marker);
    this.setState({ previousMarker: null });
    console.log(this.props.map);
  };

  // 사용자 공원 추가모드 시작1
  addStart = () => {
    document.getElementById("stopAddMode").hidden = false;
    document.getElementById("startAddMode").innerHTML =
      "원하는 지역을 지도에서 클릭하세요";
    document.getElementById("startAddMode").disabled = true;
    daum.maps.event.addListener(this.props.map, "click", this.clickHandler);
  };

  // 사용자 공원 추가모드(지도클릭 리스너 적용 : 마우스로 지도 클릭했을 때, 지도 위치에 마커 찍어주기)
  clickHandler = mouseEvent => {
    let latlng = mouseEvent.latLng;
    if (this.state.previousMarker) {
      this.state.previousMarker.setMap(null);
    }
    /* TODO : 적잘한 이미지 만들기 ===================== */
    let imageSrc =
        "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
      imageSize = new daum.maps.Size(22, 25), // 마커이미지의 크기입니다
      imageOption = { offset: new daum.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    let markerImage = new daum.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    ); // 마커가 표시될 위치입니다
    let marker = new daum.maps.Marker({
      position: latlng,
      image: markerImage
    });
    /* TODO : 적절한 이미지 만들기 <끝>================== */

    marker.setPosition(latlng);
    marker.setMap(this.props.map);
    // this.setState({
    //   previousMarker: marker,
    //   markerLat: latlng.getLat(),
    //   markerLng: latlng.getLng()
    // });
    
    this.state.previousMarker = marker;
    this.state.markerLat = latlng.getLat();
    this.state.markerLng = latlng.getLng();

    document.getElementById("confirmAddress").hidden = false;
  };

  

  render() {
    let map = this.props.map;
    console.log(map);
    
    if (map) {
      // 초기 적용입니다(크게 신경 안쓰셔도 됩니다)
      let mapObj = document.getElementById("map");
      let startAddMode = document.getElementById("startAddMode");
      let stopAddMode = document.getElementById("stopAddMode");
      let confirmAddress = document.getElementById("confirmAddress");
      let inputMessageForm = document.getElementById("inputMessageForm");
      startAddMode.hidden = false;
      mapObj.appendChild(startAddMode);
      mapObj.appendChild(stopAddMode);
      mapObj.appendChild(confirmAddress);
      mapObj.appendChild(inputMessageForm);
      this.removeAdd();
    }

    // CSS
    const inputMessageForm_style = {
      position: "absolute",
      top: "12%",
      right: "2%",
      zIndex: "2",
      MozBorderRadius: "10px",
      WebkitBorderRadius: "10px",
      fontSize: "10px"
    };
    const confirmAddress_style = {
      position: "absolute",
      backgroundColor: "yellow",
      top: "12%",
      right: "2%",
      zIndex: "2",
      MozBorderRadius: "10px",
      WebkitBorderRadius: "10px",
      fontSize: "10px"
    };
    const startAddMode_style = {
      position: "absolute",
      backgroundColor: "white",
      top: "5%",
      right: "2%",
      zIndex: "2",
      MozBorderRadius: "10px",
      WebkitBorderRadius: "10px",
      fontSize: "20px"
    };
    const stopAddMode_style = {
      position: "absolute",
      backgroundColor: "white",
      bottom: "5%",
      right: "2%",
      zIndex: "2",
      MozBorderRadius: "10px",
      WebkitBorderRadius: "10px",
      fontSize: "20px"
    };


    return (
      <div>
        <div id="showResult" />
        <div
          id="inputMessageForm"
          hidden="true"
          value=""
          style={inputMessageForm_style}
        >
          {/* <MessageInput
            confirmMarker={this.confirmMarker}
            removeAdd={this.removeAdd}
            map={map}
          /> */}
        </div>

        <button
          id="startAddMode"
          hidden="true"
          style={startAddMode_style}
          onClick={this.addStart}
        >
          입력 시작하기
        </button>

        <button
          id="confirmAddress"
          hidden="true"
          style={confirmAddress_style}
          onClick={this.confirmAddress}
        >
          선택 지점에 메시지 입력하기
        </button>

        <button
          id="stopAddMode"
          style={stopAddMode_style}
          hidden="true"
          onClick={this.removeAdd}
        >
          추가모드 없애기
        </button>
      </div>
    );
  }
}

export default Playground;
