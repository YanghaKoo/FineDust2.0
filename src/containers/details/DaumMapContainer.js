/* global daum */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DaumMap from "components/details/DaumMap";
import { connect } from "react-redux";
import * as dustActions from "store/modules/dustInfo";
//import * as latlngActions from "store/modules/latlng";
import { bindActionCreators } from "redux";
import Loading from "components/common/Loading";

class DaumMapContainer extends Component {
  // 현재 지도 중심 좌표 일시저장

  render() {
    const { infos, DustActions, match } = this.props;
    console.log("DaumMap Container")
    //console.log(match.params.id);

    // 흠 맵만 로딩으로 돌리고 싶은데
    if (!infos[0]) {
      DustActions.getDust();
      return <Loading pageHeight={50} logoWidth={70} />;
    }

    return (
      <DaumMap
        infos={infos}
        change={match.params.id}
        //  lat={lat}
        //  lng={lng}
        //  onChange={LatlngActions.change}
      />
    );
  }
}

export default connect(
  state => ({
    infos: state.dustInfo.infos,
    //lat: state.latlng.lat,
    //lng: state.latlng.lng
  }),
  dispatch => ({
    DustActions: bindActionCreators(dustActions, dispatch),
    //LatlngActions: bindActionCreators(latlngActions, dispatch)
  })
)(withRouter(DaumMapContainer));
