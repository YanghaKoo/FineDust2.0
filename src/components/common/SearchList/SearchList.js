import React, { Component } from "react";
import SearchListItem from 'components/common/SearchListItem'

import "./SearchList.scss";

class SearchList extends Component {

  render() {
    console.log("SearchList render");
    
    const { term, infos } = this.props;
    
    // if (!infos[0]) {
    //   return <Loading pageHeight={50} logoWidth={50} />;
    // }
    
    const list = infos.map(item => {
      return (        
        <SearchListItem
          cityName={item.stationname}
          key={item.id}
          id={item.id}
          khaigrade={item.khaigrade}
          info={item}          
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
