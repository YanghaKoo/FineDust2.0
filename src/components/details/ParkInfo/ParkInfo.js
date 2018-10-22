import React, { Component } from 'react';
//import './Parkinfo.scss'
class ParkInfo extends Component {
render(){
  const { parks } = this.props

  return (
    <div className="park-info">
      {parks[0].p_nm}
    </div>
  )
}
}

export default ParkInfo