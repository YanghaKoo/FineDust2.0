import React, { Component } from "react";
import DaumMapContainer from "containers/details/DaumMapContainer";
import "./DetailTemplate.scss";
import SearchBarContainer from "containers/common/SearchBarContainer";
import Info from "../../components/details/Info/Info";
import { connect} from 'react-redux'
import { bindActionCreators } from "redux";
import * as dustActions from "store/modules/dustInfo";
import Loading from 'components/common/Loading'
import ParkInfoContainer from "containers/details/ParkInfoContainer";



class DetailTemplate extends Component {
  render() {
    const { infos, match, DustActions } = this.props;
    const selected = infos.filter(item => {
      return item.id === Number(match.params.id);
    });


    if(!infos[0]){
      DustActions.getDust();
      return (
        <Loading pageHeight={90} logoWidth={70}/>
      )
     }


    return (
      <div>
        <center><SearchBarContainer/></center>
        
        <div className="detail-template" style={{background : "white"}}>
          <Info infos={selected}/>
          <div className="rigth-part">
            <DaumMapContainer />
            <div className="park-info">
               <ParkInfoContainer />
            </div>            
          </div>
        </div>
      </div>
    );


  }
}

export default connect(
  state=> ({
    infos : state.dustInfo.infos
  }),
  dispatch => ({
    DustActions : bindActionCreators(dustActions, dispatch)
  })
)(DetailTemplate)