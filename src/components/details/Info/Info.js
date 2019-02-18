import React, { Component } from "react";
import "./Info.scss";
import Chart from "../../../lib/Chart";
import { Motion, spring } from "react-motion";

class Info extends Component {
  render() {
    const { infos, beforeInfos } = this.props;
    let data = [];

    if (!infos)
      return (
        <div className="info">
          <div className="sorry">
            <div className="inner">
              <img src={"https://image.flaticon.com/icons/svg/187/187150.svg"} width={200} height={200} alt="" />
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
        {
          name: "-2days",
          미세: _2daybefore.pm10value,
          초미세: _2daybefore.pm25value,
          amt: 2400
        },
        {
          name: "-1day",
          미세: _1daybefore.pm10value,
          초미세: _1daybefore.pm25value,
          amt: 2210
        },
        {
          name: "Now!",
          미세: infos.pm10value,
          초미세: infos.pm25value,
          amt: 2290
        }
      ];
    }

    let result = null;
    let background = null;
    let facialImage = null;
    let fontColor = null;
    

    /*
    {"id":1,"stationname":"중구","infostime":"2018-08-09 16:00","so2value":"0.003","covalue":"0.2",
    "o3value":"0.046","no2value":"0.020","pm10value":"39","khaivalue":"66","khaigrade":"100","so2grade":"1",
    "cograde":"1","o3grade":"2","no2grade":"1","pm10grade":"2","lat":37.5640907,"lng":126.99794029999998}
    */
    if (infos.pm10value === null) {
      result = "관측 결과 없음";
      background = "";
      facialImage = "https://image.flaticon.com/icons/svg/1178/1178479.svg";
    } else if (infos.pm10value <= 15) {
      result = "최고^_^";
      background = "#d0ebff";
      facialImage = "https://image.flaticon.com/icons/svg/576/576803.svg"; // done
    } else if (infos.pm10value <= 30) {
      result = "좋음";
      background = "#a5d8ff";
      facialImage = "https://image.flaticon.com/icons/svg/187/187154.svg"; // done
    } else if (infos.pm10value <= 40) {
      result = "양호";
      background = "#4dabf7";
      facialImage = "https://image.flaticon.com/icons/svg/725/725107.svg"; // done
    } else if (infos.pm10value <= 50) {
      result = "보통";
      background = "#63e6be";
      facialImage = "https://image.flaticon.com/icons/svg/576/576866.svg"; // done 턱괴기
    } else if (infos.pm10value <= 75) {
      result = "나쁨";
      background = "#ffe066";
      facialImage = "https://image.flaticon.com/icons/svg/187/187146.svg"; // done
    } else if (infos.pm10value <= 100) {
      result = "상당히 나쁨";
      background = "#fcc419";
      facialImage = "https://image.flaticon.com/icons/svg/187/187165.svg"; // done 초록
    } else if (infos.pm10value <= 150) {
      result = "매우 나쁨";
      background = "#f08c00";
      facialImage = "https://image.flaticon.com/icons/svg/187/187144.svg"; // done  눈물
      fontColor = { color: "white" };
    } else {
      result = "최악";
      background = "#212529";
      facialImage = "https://image.flaticon.com/icons/svg/187/187164.svg";
      fontColor = { color: "white" };
    }

    return (
      <Motion
        defaultStyle={{ x: -400, opacity: 0 }}
        style={{ x: spring(0), opacity: spring(1) }}
      >
         {style => (
        <div className="info">
          <div className="main-wrapper">         
              <div
                className="main"
                style={{
                  background: background,
                  opacity: style.opacity,
                  // transform: `translateX(${style.x}px)`,                
                  transition  : "0.5s"
                }}
              >
                <div className="message" style={fontColor}>
                  <div>
                    <span className="city">{infos.stationname}</span>의 지금
                    공기는
                  </div>
                  <div>
                    <span className="result">{result}</span> ({infos.pm10value}{" "}
                    ㎍/㎥){" "}
                  </div>
                </div>
                <br />
                <center>
                  <img src={facialImage} alt="" />
                </center>
              </div>
            
          </div>

          <div className="middle-wrapper">
            <div className="middle" style={{transform:`translateX(${style.x}px)`}}>
              <Chart data={data} />
            </div>
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
         )}
      </Motion>
    );
  }
}

export default Info;
