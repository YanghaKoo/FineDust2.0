import React, { Component } from "react";
import SearchListItem from 'components/main/SearchListItem'

import "./SearchList.scss";

class SearchList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    //if(this.props.index !== nextProps.index) return false
    return this.props.infos !== nextProps.infos
  }
    
  render() {
   // console.log("SearchList render");
    
    const { term, infos, index, setIndex } = this.props;   
    //console.log(infos)
    setIndex()
    

    const list = infos.map((item,idx) => {
      return (        
        <SearchListItem
          cityName={item.stationname}
          key={item.id}
          id={item.id}
          khaigrade={item.khaigrade}
          //info={item}         
          index={index}
          idx={idx}
        />
      );
    });

    let isHidden = true;
    if (term.length >= 1 && infos.length > 0) {
      isHidden = false;
    } else {
      isHidden = true;
    }   
         
    return (
      <center>
        <div className={`search-list ${isHidden ? "hidden" : ''}`}>
          {list}
        </div>
      </center>
    );
  }
}

export default SearchList;
