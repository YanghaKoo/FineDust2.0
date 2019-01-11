import React, { Component } from "react";
import DaumMapContainer from "containers/details/DaumMapContainer";
import "./DetailTemplate.scss";
import SearchBarContainer from "containers/main/SearchBarContainer";
import Info from "../../components/details/Info/Info";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dustActions from "store/modules/dustInfo";
import Loading from "components/common/Loading";
import ParkInfoContainer from "containers/details/ParkInfoContainer";

class DetailTemplate extends Component {
  render() {
    const { infos, match, DustActions } = this.props;
    const selected = infos.filter(item => {
      return item.id === Number(match.params.id);
    });

    if (!infos[0]) {
      DustActions.getDust();
      return <Loading pageHeight={90} logoWidth={50} />;
    }

    return (
      <div className="whole">
        <div className="searchbar">
          <SearchBarContainer bottomColor={null} fontColor="black"/>
        </div>
        <div className="detail-template" style={{ background: "white" }}>
          <Info infos={selected} />
          <div className="rigth-part">
            <DaumMapContainer id={match.params.id} />
            <div className="park-info">
              <ParkInfoContainer id={match.params.id}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    infos: state.dustInfo.infos
  }),
  dispatch => ({
    DustActions: bindActionCreators(dustActions, dispatch)
  })
)(DetailTemplate);
