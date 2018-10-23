import React, {Component} from 'react'
import { connect } from "react-redux";
import * as parkActions from "store/modules/parks";
import { bindActionCreators } from "redux";
import ParkInfo from 'components/details/ParkInfo'
import Loading from 'components/common/Loading'

class ParkInfoContainer extends Component{
  render(){
    const {parks, ParkActions} = this.props
    
    if(!parks[0]){
      ParkActions.getPark()
      
      return (<Loading pageHeight={30} logoWidth={50}/>)
    }

    return (
      <ParkInfo parks={parks}/>
    )
  }
}



export default connect(
  state =>({
    parks : state.parks.parks
  }),
  dispatch => ({
    ParkActions : bindActionCreators(parkActions, dispatch)
  })
)(ParkInfoContainer)