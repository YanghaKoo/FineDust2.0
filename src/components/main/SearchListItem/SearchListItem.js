import React from "react";
import "./SearchListItem.scss";
import {withRouter} from 'react-router-dom'

const SearchListItem = ({cityName, id, khaigrade, index, idx,history}) => {

  let cn = "search-list-item"
  if(index === idx){
    cn = "search-list-item selected"
  }

  return(
   <div className={cn} onClick={()=>{
      history.push(`/details/${id}`)    
   }}>
     {cityName}
   </div>
  )
};

export default withRouter(SearchListItem)

// class SearchListItem extends Component {
//   render() {
//     const { cityName, id, index } = this.props;
//     return (
//       <div className="search-list-item">
//         <button onClick={()=>{console.log(index)}}>asd</button>
//         <Link to={"/details/" + id}>{cityName}</Link>
//       </div>
//     );
//   }
// }

// export default SearchListItem;
