import React, { Component } from "react";
import "./SearchBar.scss";

class SearchBar extends Component {
  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { term, onKeyPress, onBlur, onKeyDown, bottomColor, fontColor } = this.props;    
    return (
      <div className="search-bar-template">
        <form
          className="search-bar"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            placeholder="Search Your Seoul!"
            value={term}
            onChange={this.handleChange}
            onKeyPress={onKeyPress}                       
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            style={{borderBottom : `2px solid ${bottomColor}`, color : fontColor,}}          
          />
          
        </form>
      </div>
    );
  }
}
export default SearchBar;
