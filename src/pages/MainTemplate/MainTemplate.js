import React, { Component } from 'react';
//import {connect } from 'react-redux'
import SearchBarContainer from 'containers/common/SearchBarContainer'
import "./MainTemplate.scss"
import Loading from 'components/common/Loading'

class MainTemplate extends Component {
  render() {
    // const { infos } = this.props
    // console.log(infos[0])
    // if(!infos[0]) {
    //   return ( <Loading />)
    // }
    

    return (
      <div className="main-template">        
        <SearchBarContainer />
        <div style={{background : '#181818', width :'100%', height : '50vh'}}></div>
      </div>
    );
  }
}

export default MainTemplate;
// export default connect(
//   state => ({
//     // loading : state.pender.pending['GET_DUST'],
//     // error : state.pender.failure['GET_DUST'],
//     infos : state.dustInfo.infos
//   })

// )(MainTemplate);