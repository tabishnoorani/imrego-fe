import React from 'react';
import {Row} from 'antd';
import ItemList from './ItemList';

const ItemLists = (props) => {
    return(
        <Row type="flex" justify="center" style= {{width:'100%'}}>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
            <ItemList/>
        </Row>
    )
}

export default ItemLists;
