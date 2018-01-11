import React, { Component } from 'react';
import { Input } from 'antd';
const Search = Input.Search;

class SearchBar extends Component {
  render() {
    return (
    <div>
      <h3 style={{color:"rgb(0, 0, 0, .4)"}}>
        Found something - search for the onwer:
      </h3>
      <Search 
      placeholder="Enter 128 digit IMREGO#" 
      enterButton="Search" 
      size="large"
      />
    </div>
        
    );
  }
}
export default SearchBar;

