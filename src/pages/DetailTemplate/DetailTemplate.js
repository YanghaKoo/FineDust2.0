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
    selected: null
  };


  async componentDidMount() {    
    const {infos, parks, DustActions, ParkActions} = this.props
    if (!infos[0] || !parks[0] ) {
      await Promise.all([
        DustActions.getDust(),
        DustActions.getBeforeDust(),
        ParkActions.getPark(),
        ParkActions.getUserInputPark()
      ]) 
    }

  }
  
  componentWillReceiveProps(nextProps) {
    const {infos} = this.props
    const nextInfos = nextProps.infos

    if (infos !== nextInfos) {
      const { infos, match, LatlngActions } = this.props;
      const selected = infos.find(item => {
        return item.id === Number(match.params.id);
      });

      if (selected) {
        // console.log("detail template")
        LatlngActions.changeNowGu(selected.stationname);
      }
    }
  }

  render() {
    const {
      infos,
      beforeInfos,            
      parks,      
      nowGu,      
      
      match,
      // DustActions,
      // ParkActions,
      // LatlngActions,
    } = this.props;

    
    

    let selected
    if(infos){
      selected = infos.find(item => {
        return item.stationname === nowGu;
      });  
    }else{
      selected = infos.find(item => {      
        return item.id === Number(match.params.id);
      });
    }
    
    

    if (!infos[0] || !parks[0] ) {
      // DustActions.getDust();
      // DustActions.getBeforeDust()
      // ParkActions.getPark();
      return <Loading pageHeight={90} logoWidth={50} />;
    }    
    

    return (
      <div className="whole">
        <div className="searchbar">
          <SearchBarContainer bottomColor={"white"} fontColor="black" />
        </div>
        <div className="detail-template" style={{ background: "white" }}>
          <Info infos={selected} beforeInfos={beforeInfos}/>
          <div className="rigth-part">
            <DaumMapContainer
              id={match.params.id}
              parks={parks}
              userInputParks={this.props.userInputParks}
              ParkActions={this.props.ParkActions}
              // selected={selected}              
            />

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
    beforeInfos : state.dustInfo.beforeInfos,
    parks: state.parks.parks,
    nowGu: state.latlng.nowGu,
    userInputParks : state.parks.userInputParks,
  }),
  dispatch => ({
    DustActions: bindActionCreators(dustActions, dispatch),
    ParkActions: bindActionCreators(parkActions, dispatch),
    LatlngActions: bindActionCreators(latlngActions, dispatch)
  })
)(DetailTemplate);
