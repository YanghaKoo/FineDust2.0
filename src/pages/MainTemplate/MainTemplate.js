import React, { Component } from 'react';
import SearchBarContainer from 'containers/main/SearchBarContainer'
import "./MainTemplate.scss"
import mainImage from '../../images/mainimage.jpg'


class MainTemplate extends Component {
  render() {
    return (
      <div className="main-template">       
        <SearchBarContainer />
        <br/>
        <div className="main-image">        
          <img src={mainImage} alt=''/>
          <div className="centered">WHO기준 우리동네 미세먼지</div>
          <div className="black"></div>
        </div>
      </div>
    );
  }
}



export default MainTemplate;
