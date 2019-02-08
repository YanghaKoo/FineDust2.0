import React, { Component } from "react";
import "./Info.scss";
import sorryImage from "images/sorry.png";
import Chart from "../../../lib/Chart";

class Info extends Component {
  render() {
    const { infos, beforeInfos } = this.props;
    let data = []

    if (!infos)
      return (
        <div className="info">
          <div className="sorry">
            <div className="inner">
              <img src={sorryImage} width={200} height={200} alt="" />
              <div className="message">
                죄송합니다.
                <br /> 아직은 일부지역만 이용이 가능합니다.
                <br />
                범위를 조금 벗어나셨습니다.
              </div>
            </div>
          </div>
        </div>
      );
    else {
      const _1daybefore = beforeInfos["1daybefore"].find(item => {
        return item.stationname === infos.stationname;
      });
      const _2daybefore = beforeInfos["2daybefore"].find(item => {
        return item.stationname === infos.stationname;
      });
      
      data = [
        {name: '-2days', "미세": _2daybefore.pm10value, "초미세" : _2daybefore.pm25value, amt: 2400},
        {name: '-1day', "미세": _1daybefore.pm10value, "초미세": _1daybefore.pm25value, amt: 2210},
        {name: 'Now!', "미세": infos.pm10value, "초미세": infos.pm25value, amt: 2290},
      ];        
    }

    let result = null;
    let background = null;


    /*
    {"id":1,"stationname":"중구","infostime":"2018-08-09 16:00","so2value":"0.003","covalue":"0.2",
    "o3value":"0.046","no2value":"0.020","pm10value":"39","khaivalue":"66","khaigrade":"100","so2grade":"1",
    "cograde":"1","o3grade":"2","no2grade":"1","pm10grade":"2","lat":37.5640907,"lng":126.99794029999998}
    */

    if (infos.pm10value <= 15) {
      result = "최고^_^";
      background = "#d0ebff";
    } else if (infos.pm10value <= 30) {
      result = "좋음";
      background = "#a5d8ff";
    } else if (infos.pm10value <= 40) {
      result = "양호";
      background = "#4dabf7";
    } else if (infos.pm10value <= 50) {
      result = "보통";
      background = "#63e6be";
    } else if (infos.pm10value <= 75) {
      result = "나쁨";
      background = "#ffe066";
    } else if (infos.pm10value <= 100) {
      result = "상당히 나쁨";
      background = "#fcc419";
    } else if (infos.pm10value <= 150) {
      result = "매우 나쁨";
      background = "#f08c00";
    } else {
      result = "최악";
      background = "#212529";
    }

    return (
      <div className="info">
        <div className="main">
          <div className="message">
          <h2>{infos.stationname}의 오늘 공기는</h2>
          <h1>
            {result} ({infos.pm10value} ㎍/㎥){" "}
          </h1>
          </div>
          <center>
            <div
              style={{
                background,
                width: "100px",
                height: "100px",
                borderRadius: "50px"
              }}
            />
          </center>
        </div>

        <div className="middle"> 
          <Chart data={data} />
        </div>

        {/* 상세정보 포함 */}
        <div className="details">
          <div className="dropbtn">
            <div style={{ textAlign: "center" }}>
              <b>상세정보 보기</b>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ul>
                <li>미세먼지(PM10) 농도 : {infos.pm10value}</li>
                <li>초미세먼지(PM2.5)농도 : {infos.pm25value} </li>
                <li>미세먼지 등급 : {infos.pm10grade} </li>
                <li>초미세먼지 등급 : {infos.pm25grade} </li>
                <li>이산화가스 농도 : {infos.so2value} </li>
                <li>일산화탄소 농도 : {infos.covalue} </li>
                <li>오존 농도 : {infos.o3value} </li>
                <li>이산화질소 농도 : {infos.no2value} </li>
                <li>이산화가스 지수 : {infos.so2grade} </li>
                <li>일산화탄소 지수 : {infos.cograde} </li>
                <li>오존 지수 : {infos.o3grade} </li>
                <li>이산화질소 지수 : {infos.no2grade} </li>
                <li>통합대기환경수치 : {infos.khaivalue} </li>
                <li>통합대기환경지수 : {infos.khaigrade} </li>
                <li>측정시간 : {infos.infostime}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
