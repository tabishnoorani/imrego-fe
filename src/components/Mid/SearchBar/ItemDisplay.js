import React from 'react';
import {Modal, Row, Col, Button, Spin, Icon, Card, Collapse} from 'antd';
// import moment from 'moment';
// import config from '../../../config';
import { cancelDisplayItem, addFoundItem } from '../../../store/actions';

const Panel = Collapse.Panel;

const gridStyle = {
	textAlign: 'center',
	wordWrap: "break-word",
	};
// const confirm = Modal.confirm;

const ItemList = (props)=>{
	const Style={
		allCenter:{
			display:'flex', 
			height: '100%', 
			justifyContent:'center', 
			alignItems:'center'
		}
	}

	const { visible, displayItemLoading, item={} } = props;

	const { imrego={}, ownerData={} } = item;

	const img = (imrego.imgURL)?imrego.imgURL:'/noitemimg.png';

	function handleCancel() {
		cancelDisplayItem();
	}

	function handleOk() {
		// addFoundItem(imrego._id);
		addFoundItem(item);
	}

	return(
	<Modal
	title={(item.success)? "HAVE YOU FOUND THIS ITEM?":"INVALID IM#"}
	visible={visible}
	onCancel={handleCancel}
	footer={(item.success)?[
			<Button disabled={displayItemLoading} key="back" onClick={handleCancel}>NO</Button>,
			<Button disabled={displayItemLoading} key="submit" type="primary" loading={false} onClick={handleOk}>
					YES! ADD TO FOUND LIST!
			</Button>,
		]:
		[<Button key="back" onClick={handleCancel}>OK</Button>]
	}>
		{(item.success)?    
		<Spin size='large' spinning={displayItemLoading}>
			{(imrego.status!=='Lost')?
			<div style={{color:'red'}}>
				<p><b>NOTE:</b> The item is not yet marked as <b>LOST</b>. You can add this item to your FOUND ITEMS by doing so the owner will be indicated about the item and as soon as it is marked as LOST you will get all the details.</p>
			</div>:""}
			<Row justify="space-around"	align="middle">
				<Col span={12} style={{...Style.allCenter}}>
					<img style={{padding:'5px', maxWidth:'100%', maxHeight:'170px'}}
					alt={props.title}
					src={img}/>
				</Col>
				<Col span={12} style={{...Style.allCenter, justifyContent:'flex-start', padding: '0px 20px'}}>
					<div style={{width:'100%'}}>
						<p><b>Owners Name: </b>{ownerData.displayName}</p>
						<p><b>Title: </b>{imrego.title}</p>
						<p><b>Catagory: </b>{imrego.catagory}</p>
						<p><b>Description: </b>{imrego.description}</p>
					</div>
				</Col>
			</Row>
			
			{(ownerData.email || ownerData.address || ownerData.address)?
			<Collapse bordered={false}>
				<Panel header="Contact details" key="1">
					{(ownerData.email)?
					<Card style={gridStyle} hoverable>
						<Icon type='mail'/>:   {ownerData.email}
					</Card>:""}

					{(ownerData.contact)?
					<Card style={gridStyle} hoverable>
						<Icon type='phone'/>:   {ownerData.contact}
					</Card>:""}

					{(ownerData.address)?
					<Card style={gridStyle} hoverable>
						<Icon type='profile'/>:   {ownerData.address}
					</Card>:""}
				</Panel>
			</Collapse>:""}
		</Spin>
		: 
		<div style={gridStyle}>
				<Icon 
				style={{margin:'15px', color: 'red', fontSize:'1.5em'}} 
				type="exclamation-circle"/> 
				Item not found! IM# is not registered with <b>IMREGO</b> or it has been deleted.
		</div>
		}

	</Modal>
	)
}

export default ItemList;