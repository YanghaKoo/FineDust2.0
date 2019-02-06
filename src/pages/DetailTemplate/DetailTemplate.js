import React, { Component } from "react";
import DaumMapContainer from "containers/details/DaumMapContainer";
import "./DetailTemplate.scss";
import SearchBarContainer from "containers/main/SearchBarContainer";
import Info from "../../components/details/Info/Info";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dustActions from "store/modules/dustInfo";
import * as parkActions from "store/modules/parks";
import * as latlngActions from "store/modules/latlng";
import Loading from "components/common/Loading";

// import ParkInfoContainer from "containers/details/ParkInfoContainer";

class DetailTemplate extends Component {

  state = {
    selected : null
  }

  componentDidMount() {
    const { infos, match,LatlngActions } = this.props;
        
    
      const selected = infos.find(item => {
        return item.id === Number(match.params.id);
      });
  
      if(selected){    
        LatlngActions.changeNowGu(selected.stationname)
      
      }        
  }
  

  render() {
    const { infos, match, DustActions, ParkActions, parks, LatlngActions, nowGu } = this.props;
    
    const selected = infos.find(item => {      
      return item.id === Number(match.params.id);
    });

    // // 현재 구 설정
    // if(selected){    
    //   LatlngActions.changeNowGu(selected.stationname)
    //   // console.log(nowGu)
    // }

        
    if (!infos[0] || !parks[0]) {
      DustActions.getDust();
      ParkActions.getPark();      
      return <Loading pageHeight={90} logoWidth={50} />;
    }

//    console.log(selected)

    return (
      <div className="whole">
        <div className="searchbar">
          <SearchBarContainer bottomColor={null} fontColor="black"/>
        </div>
        <div className="detail-template" style={{ background: "white" }}>
          <Info infos={selected} nowGu={nowGu} />
          <div className="rigth-part">
            <DaumMapContainer id={match.params.id} parks={parks} stationname={selected.stationname} />
            
            
            {/* <div className="park-info">
              <ParkInfoContainer id={match.params.id}/>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    infos: state.dustInfo.infos,
    parks : state.parks.parks,
    nowGu : state.latlng.nowGu
  }),
  dispatch => ({
    DustActions: bindActionCreators(dustActions, dispatch),
    ParkActions : bindActionCreators(parkActions, dispatch),
    LatlngActions : bindActionCreators(latlngActions, dispatch)
  })
)(DetailTemplate);
