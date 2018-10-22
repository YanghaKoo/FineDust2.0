import React, { Component } from "react";
import { connect } from "react-redux";
import * as inputActions from "store/modules/input";
import * as dustActions from "store/modules/dustInfo";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import SearchList from "components/common/SearchList";

//import { withRouter} from 'react-router-dom'
import SearchBar from "components/common/SearchBar";

class SearchBarContainer extends Component {
  componentDidMount() {
    const { DustActions } = this.props;
    DustActions.getDust();
  }

  handleBlur = e => {
    const { InputActions } = this.props;
    setTimeout(() => {
      InputActions.change("");
    }, 100);
  };
  
  // searchbar에서 엔터누르면 검색결과의 가장 위에 요소의 디테일 페이지로 이동
  handleKeyPress = e => {
    const { term, InputActions, infos, history, match, DustActions } = this.props;
    const filteredData = infos.filter(
      item => item.stationname.indexOf(this.props.term) !== -1
    );

    if (term.length >= 1 && filteredData[0] && e.key === "Enter") {
      if(match.params.id){
        // 이경우에 새로고침을 시켜서 daum map을 새로고침 시켜야 함
        DustActions.getDust();
      }


      InputActions.change("");
      history.push(`/details/${filteredData[0].id}`);
    }
  };




  render() {
    const { InputActions, term, infos } = this.props;
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
          onBlur={this.handleBlur}
        />
        <SearchList term={term} infos={filteredData} />
      </div>
    );
  }
}

export default connect(
  state => ({
    term: state.input.term,
    infos: state.dustInfo.infos
  }),

  dispatch => ({
    InputActions: bindActionCreators(inputActions, dispatch),
    DustActions: bindActionCreators(dustActions, dispatch)
  })
)(withRouter(SearchBarContainer));
