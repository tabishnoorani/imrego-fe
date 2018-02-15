import React, { Component } from 'react';
import { Row, Col, Input, Affix, Icon } from 'antd';
import {connect} from 'react-redux';
import {searchItem} from '../../../store/actions';
import SearchedItem from './SearchedItem';

const Search = Input.Search;

class SearchBar extends Component {
  render() {
    function handleSearch(imNum){
        searchItem(imNum)
    }
    return (
      <Row type="flex" justify="center">
        <Col span={20}>
          <h3 style={{color:"rgb(0, 0, 0, .4)"}}>
          Found something - search for the onwer:
          </h3>
          <Affix offsetTop={94}>
            <Search
            disabled = {this.props.loading}
            placeholder="Enter IM#" 
            enterButton={<Icon type={(this.props.loading)?'loading':'search'} />}  
            size="large"
            onSearch={handleSearch}
            />
        </Affix>
        <SearchedItem/>
        </Col>
      </Row>
        
    );
  }
}

const returnState = (store)=>{
  return({
    loading: store.Status.loders.imregoSearch
  });
}

export default connect(returnState)(SearchBar);

