import React from 'react';
import {connect} from 'react-redux';
import {Select, Tooltip} from 'antd';
import {currentCatagory} from '../../../store/actions';

const Option = Select.Option;


const SortBy = (props)=>{

    function handleChange(value){
        currentCatagory(value);
    }
    
    const Options = props.catagories.map((catagory, index)=>
            <Option key={`${index}-catagories`} value={catagory.value}>{catagory.optionName}</Option>
        );

    return(
        <Tooltip
        placement="bottom" title="Sort By">
            <Select
            placeholder="Sort By"
            style={{ width: 200 }} 
            onChange={handleChange}>
                {Options}
            </Select>
        </Tooltip>
    )
}

const returnState = (store)=>{
    return({
      catagories: store.ItemLists.catagories
    });
  }

export default connect(returnState)(SortBy);