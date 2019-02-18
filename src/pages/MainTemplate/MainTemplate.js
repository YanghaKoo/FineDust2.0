import React, { Component } from "react";
import SearchBarContainer from "containers/main/SearchBarContainer";
import "./MainTemplate.scss";

// import axios from 'axios'

class MainTemplate extends Component {

  // componentDidMount(){
  //   axios.get('http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=%EC%84%9C%EC%9A%B8&pageNo=1&numOfRows=10&ServiceKey=An1Q8qFq4qIZaRHmlEPiHccL4bcaAe%2FqbOkP2RFZLO%2B6uYxJujKNedGWvNNh5vyaGyKhPQFHgmzTVtM%2B4CWILQ%3D%3D&ver=1.0&ver=1.0&_returnType=json')
  //     .then(a=>console.log(a))
  //     .catch(e=> console.log(e))
  // }
  

  render() {
    return (
      <div className="main-template">
        <div className="main-image">
          <img
            src={"https://t1.daumcdn.net/cfile/tistory/221CC74458D002362F"}
            alt=""
          />
          <div className="centered">
            <div className="search-bar">
              <SearchBarContainer bottomColor="white" fontColor="white" />
            </div>
            <div />

            <div className="content">
              WHO기준 {window.innerWidth < 400 ? <br /> : null}우리동네 미세먼지
              &<br />
              주변 공원 둘러보기!
            </div>
            <center>
              <div className="functions">
            
                <div className="function">
                  <img
                    src="https://lh3.googleusercontent.com/VeyQv81dcHv5AnFVr_M_Sgt8vtulezJotK-xwwVXhfQVTOxpstd0ALJ-OFad95rX6uQ"
                    alt=""
                  />
                  <span className="ment">서울 내 실시간 미세먼지 정보</span>
                </div>
                <div className="function">
                  <img
                    src="https://image.flaticon.com/icons/svg/406/406544.svg"
                    className="park"
                    alt=""
                  />
                  <span className="ment">우리동네 근처 공원 정보</span>
                </div>
                {/* <div className="half"></div> */}
                <div className="function">
                  <img
                    src="https://image.flaticon.com/icons/svg/201/201916.svg"
                    style={{width : "90%"}}
                    alt=""                    
                  />
                  <span className="ment">나만아는 공원 공유!</span>
                </div>
              </div>
            </center>
          </div>

          <div className="black" />
        </div>
      </div>
    );
  }
}

export default MainTemplate;
