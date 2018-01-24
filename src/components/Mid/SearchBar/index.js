import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';

const Search = Input.Search;

class SearchBar extends Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={20}>
          <h3 style={{color:"rgb(0, 0, 0, .4)"}}>
          Found something - search for the onwer:
          </h3>
          <Search 
          placeholder="Enter IM#" 
          enterButton="Search"  
          size="large"
          />
        </Col>
      </Row>
        
    );
  }
}
export default SearchBar;

