import React from 'react';
import {Modal, Row, Col, Button, Divider, Spin} from 'antd';
import { delItem, showModalForm } from '../../../../store/actions/index';
import LostFoundButton from './LostFoundButton';

const confirm = Modal.confirm;

const ItemList = (props)=>{
    
    function RemoveItem(){
        confirm({
            title: `Deleting ${props.title}.`,
            content:
                <div>
                    <p><b>Description:</b> {props.description}</p>
                    <p><b>IM#:</b> {props.imNum}</p>
                    <p>Are you sure you want to delete it?</p>
                </div>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                delItem(props._id);
            },
            onCancel() {
                // props.onCancel()||console.log('Cancel');
            },
        });
    }
    
    function editItem() {
        showModalForm(props._id)
    }

    const Style={
        allCenter:{
            display:'flex', 
            height: '100%', 
            justifyContent:'center', 
            alignItems:'center'
        }
    }
    return(
    <Spin spinning={props.deleting ||false}>
    <Row gutter={0} type="flex" 
            justify="center" 
            style= {{width:'100%'}}>
    <Row style={{
        marginTop:'10px',
        padding:'15px', width:'95%', 
        height:'200px', 
        backgroundColor:'white'}} 
        justify="space-around" 
        align="middle">
        <Col span={3} style={{...Style.allCenter}}>
            <Row>
                <Col span={24} style={{...Style.allCenter}}>
                    <span>
                        <Button 
                        type="danger" 
                        shape="circle" 
                        icon="delete" 
                        size="default"
                        onClick={RemoveItem} 
                        ghost/>

                        <span style={{color:'whitesmoke'}}>-  |  -</span>
                        
                        <Button 
                        type="primary" 
                        shape="circle" 
                        icon="edit" 
                        size="default"
                        onClick={editItem}
                        ghost/>
                    </span>
                </Col>
                <Col span={24} style={{...Style.allCenter, marginTop:'10px'}}>
                    <LostFoundButton 
                    loadingLFB={props.loadingLFB} 
                    _id={props._id} 
                    status = {props.status} />
                </Col>
            </Row>
        </Col>

        <Col span={4} style={{...Style.allCenter}}>
            <img style={{padding:'5px', maxWidth:'100%', maxHeight:'170px'}}
            alt={props.title}
            src={props.imgURL}/>
        </Col>

        <Col span={12} style={{...Style.allCenter, justifyContent:'flex-start', padding: '0px 20px'}}>
            <div style={{width:'100%'}}>
                <Divider>{props.title}</Divider>
                <p><b>Catagory: </b>{props.catagory}</p>
                <p><b>Desciption: </b>{props.description}</p>
                <p><b>IM: </b>{props.imNum}</p>
                <p><b>Date added: </b>{props.date}</p>

            </div>
        </Col>

        <Col span={5} style={{...Style.allCenter}}>
            <img style={{padding:'5px', maxWidth:'100%', maxHeight:'170px'}}
            alt="TITLE"
            src='http://logonoid.com/images/suncorp-logo.png'/>
        </Col>
    </Row>
    </Row>
    </Spin>
    )
}

export default ItemList;