import React from 'react';
import {Row, Spin, Card} from 'antd';
import ItemList from './ItemList';
import { connect } from 'react-redux';

const ItemLists = (props) => {
    const ItemListCompound = props.ItemLists.map((itemList, index)=>
        <ItemList iKey={index} key={`${index}-ItemList`} {...itemList}/>
    );
    
    return(
        <Row type="flex" justify="center" style= {{width:'100%'}}>
            <Spin spinning={props.fetching} size="large">
                    {(props.ItemLists.length !== 0) ? 
                        ItemListCompound
                        :<Card >No items found! Click Add Item button to add items.</Card>}
            </Spin>
        </Row>
    )
}

const returnState = (store)=>{
    return({
      ...store.ItemLists
    });
  }
  
  export default connect(returnState)(ItemLists);
