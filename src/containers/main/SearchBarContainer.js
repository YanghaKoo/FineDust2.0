import React, { Component } from "react";
import { connect } from "react-redux";
import * as inputActions from "store/modules/input";
import * as dustActions from "store/modules/dustInfo";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import SearchList from "components/common/SearchList";
import SearchBar from "components/common/SearchBar";

class SearchBarContainer extends Component {
  
  state = {
    index : 0
  }
  
  componentDidMount() {
    const { DustActions } = this.props;
    DustActions.getDust();
  }

  handleBlur = e => {
    const { InputActions } = this.props;
    setTimeout(() => {
      InputActions.change("");
    }, 150);
  };
  
  // searchbar에서 엔터누르면 검색결과의 가장 위에 요소의 디테일 페이지로 이동
  handleKeyPress = e => {
    const { term, InputActions, infos, history, match, DustActions } = this.props;
    const {index} = this.state
    const filteredData = infos.filter(
      item => item.stationname.indexOf(this.props.term) !== -1
    );

   if (term.length >= 1 && filteredData[0] && e.key === "Enter" && index < filteredData.length) {
      if(match.params.id){
        DustActions.getDust();
      }
      InputActions.change("");
      history.push(`/details/${filteredData[index].id}`);      
    }else if(index >= filteredData.length && e.key === "Enter" ){
      this.setState({
        index : 0
      })
      //history.push(`/details/${filteredData[0].id}`);      
    }
  };

  // 검색 리스트에서 방향키로 탐색하는 로직
  handleArrowKeys = (e) => {    
    const {infos, term} = this.props
    const { index } = this.state
    const filteredData = infos.filter(
      item => item.stationname.indexOf(term) !== -1
    );
    
    if(e.keyCode === 40 && index >= filteredData.length){
      this.setState({
        index : 0
      })
    }

    if (e.keyCode === 38 && term.length >=1) {
      e.preventDefault()
      if(index >0){
        this.setState({
          index : index-1
        })
      }
    } else if (e.keyCode === 40 && term.length >=1) {     
      e.preventDefault()
      if(index < filteredData.length -1){
        this.setState({
          index : index + 1
        })
      } 
    }
  }

  setIndex = () => {
    if(this.state.index !== 0 && !this.props.infos[0]){
      console.log('setIndex')
      this.setState({
        index : 0
      })
    }    
  }

  render() {
    const { InputActions, term, infos, bottomColor , fontColor} = this.props;
    const {index} = this.state  

    const filteredData = infos.filter(
      item => item.stationname.indexOf(term) !== -1
    );

    return (
      <div>
        <SearchBar
          term={term}
          onChange={InputActions.change}
          infos={infos}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleArrowKeys}
          onBlur={this.handleBlur}
          bottomColor={bottomColor}          
          fontColor={fontColor}
        />
        <SearchList term={term} infos={filteredData} index={index} setIndex={this.setIndex}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    term: state.input.term,
    infos: state.dustInfo.infos,    
  }),
  dispatch => ({
    InputActions: bindActionCreators(inputActions, dispatch),
    DustActions: bindActionCreators(dustActions, dispatch)
  })
)(withRouter(SearchBarContainer));
