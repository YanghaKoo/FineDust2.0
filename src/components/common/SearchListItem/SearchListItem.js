import React from 'react';
import {Link} from 'react-router-dom'
import "./SearchListItem.scss"

const SearchListItem = ({cityName, id, khaigrade}) => {
  return(
   
   <div className="search-list-item">
     <Link to={"/details/"+id}>{cityName}</Link>     
   </div>

  )
};


export default SearchListItem;