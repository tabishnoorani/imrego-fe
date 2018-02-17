import React, { Component } from 'react';
import { Row, Col, Input, Affix, Icon } from 'antd';
import {connect} from 'react-redux';
import {searchItem} from '../../../store/actions';
import ItemDisplay from './ItemDisplay';

const Search = Input.Search;

class SearchBar extends Component {
  render() {
    function handleSearch(imNum){
      searchItem(imNum)
  }

  const { searchLoader } = this.props

  return (
    <div>
      <Row type="flex" justify="center">
        <Col span={20}>
          <h3 style={{color:"rgb(0, 0, 0, .4)"}}>
          Found something - search for the onwer:
          </h3>
          <Affix offsetTop={94}>
            <Search
            disabled = {searchLoader}
            placeholder="Enter IM#" 
            enterButton={<Icon type={(searchLoader)?'loading':'search'} />}  
            size="large"
            onSearch={handleSearch}
            />
        </Affix>
        </Col>
      </Row>
      {(this.props.visible)?
      <ItemDisplay {...this.props}/>:
      ""
      }
    </div>
      
  );
  }
}

const returnState = (store)=>{
  return({...store.SearchBar});
}

export default connect(returnState)(SearchBar);

