import React from 'react';
import {Card, Row, Col, Button} from 'antd';

const ItemList = (props)=>{
    const Style={
        allCenter:{
            display:'flex', 
            height: '100%', 
            justifyContent:'center', 
            alignItems:'center'
        }
    }
    return(
    <Row style={{marginTop:'10px', padding:'15px', width:'95%', height:'200px', backgroundColor:'white'}} justify="space-around" align="middle">
        
        <Col span={3} style={{...Style.allCenter}}>
            <span>
                <Button 
                type="danger" 
                shape="circle" 
                icon="delete" 
                size="default" 
                ghost/>
                <Button 
                type="primary" 
                shape="circle" 
                icon="edit" 
                size="default" 
                ghost/>
            </span>
        </Col>

        <Col span={4} style={{...Style.allCenter}}>
            <img style={{padding:'5px', maxWidth:'100%', maxHeight:'170px'}}
            src='https://res.cloudinary.com/oleaw/image/upload/v1514192577/sample.jpg'/>
        </Col>

        <Col span={12} style={{...Style.allCenter, justifyContent:'flex-start', padding: '0px 20px'}}>
            <div>
                <h2>TITLE</h2>
                <p><b>Catagory: </b>Flower</p>
                <p><b>Desciption: </b>Red Flower</p>
                <p><b>IM: </b>133122-123312-12313123-123123</p>
            </div>
        </Col>

        <Col span={5} style={{...Style.allCenter}}>
            <div>
                Sponsor
            </div>
        </Col>

    </Row>
    )
}

export default ItemList;