import React, { Component } from "react";
import SearchBarContainer from "containers/main/SearchBarContainer";
import "./MainTemplate.scss";
import mainImage from "../../images/mainimage.jpg";

class MainTemplate extends Component {
  render() {
    return (
      <div className="main-template">
        <div className="main-image">
          <img src={mainImage} alt="" />
          <div className="centered">
            <div className="search-bar">
              <SearchBarContainer bottomColor="white" fontColor="white" />
            </div>
            <div />

            <div className="content">WHO기준 우리동네 미세먼지</div>
            <center>
              <div className="functions">
                <div className="function">기능1</div>
                <div className="function">기능2</div>
                <div className="function">기능3</div>
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
