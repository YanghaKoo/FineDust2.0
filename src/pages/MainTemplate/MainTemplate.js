import React, { Component } from 'react';
import SearchBarContainer from 'containers/main/SearchBarContainer'
import "./MainTemplate.scss"


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
