/* global daum */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DaumMap from "components/details/DaumMap";
import { connect } from "react-redux";
import * as dustActions from "store/modules/dustInfo";
import * as latlngActions from "store/modules/latlng";

import { bindActionCreators } from "redux";
//import * as latlngActions from "store/modules/latlng";
// import Loading from "components/common/Loading";

class DaumMapContainer extends Component {
  // 현재 지도 중심 좌표 일시저장
  render() {
    const { infos, match, nowGu, LatlngActions } = this.props;
    
    // console.log("DaumMap Container")        
    // if (!infos[0]) {
    //   DustActions.getDust();
    //   return <Loading pageHeight={50} logoWidth={70} />;
    // }

    return (
      <DaumMap
        infos={infos}
        change={match.params.id}
        id={this.props.id}
        parks={this.props.parks}
        nowGu={nowGu}
        LatlngActions={LatlngActions}
        userInputParks={this.props.userInputParks}
        ParkActions={this.props.ParkActions}

        // selected={this.props.selected}        
      />
    );
  }
}

export default connect(
  state => ({
    infos: state.dustInfo.infos,    
    nowGu : state.latlng.nowGu
  }),
  dispatch => ({
    DustActions: bindActionCreators(dustActions, dispatch),  
    LatlngActions : bindActionCreators(latlngActions, dispatch)  
  })
)(withRouter(DaumMapContainer));
