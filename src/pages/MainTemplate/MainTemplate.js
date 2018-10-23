import React, { Component } from 'react';
//import {connect } from 'react-redux'
import SearchBarContainer from 'containers/common/SearchBarContainer'
import "./MainTemplate.scss"
//import Loading from 'components/common/Loading'

class MainTemplate extends Component {
  render() {
    return (
      <div className="main-template">       
        <SearchBarContainer />
        <div className="main-image"></div>
      </div>
    );
  }
}



export default MainTemplate;
