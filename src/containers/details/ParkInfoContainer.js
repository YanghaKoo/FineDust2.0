import React, {Component} from 'react'
import { connect } from "react-redux";
import * as parkActions from "store/modules/parks";
import { bindActionCreators } from "redux";
import ParkInfo from 'components/details/ParkInfo'
import Loading from 'components/common/Loading'

class ParkInfoContainer extends Component{
   
  // url을 기준으로 axios 요청을 보내야 할 것 같은데????
  // 여기서!! 지금은 아무기능 안함
  componentWillReceiveProps(nextProps){
    const {parks, ParkActions} = this.props    
    if(this.props.id !== nextProps){
      ParkActions.getPark();      
    }
  }
  
  
  render(){    
    const {parks, ParkActions} = this.props    
    if(!parks[0]){
      ParkActions.getPark()      
      return (<Loading pageHeight={30} logoWidth={50}/>)
    }
    return (
      <ParkInfo parks={this.props.parks}/>
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