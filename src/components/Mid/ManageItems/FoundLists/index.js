import React from 'react';
import { 
  Button, 
  Dropdown,  
  Row,   
  Table, 
} from 'antd';
import { initializeFoundList, updateFoundItemStatus } from '../../../../store/actions/index';
import moment from 'moment';
import { connect } from 'react-redux';
import config from '../../../../config';

class FoundList extends React.Component {
  componentWillMount(){
    if (!this.props.FoundItemInitialized){
      initializeFoundList();
    }
  }

  render() {
    function remove(_id){
      console.log(_id)
      updateFoundItemStatus(_id, 'Deleted')
    }

    const Style= {
      allCenter: {
        display:'flex', 
        height: '100%', 
        justifyContent:'center', 
        alignItems:'center'
      },
      mainRow: {
        marginTop:'10px',
        padding:'0px 0px', 
        width:'100vw', 
        // height:'200px', 
        backgroundColor:'white'
      }
    }
    
    const fullImg= imgURL =>
      <img alt='Full size' style={{marginLeft:'2vw', maxWidth:'60vw', maxHeight:'60vh'}} src={(imgURL) ? imgURL:'/noitemimg.png'}/>
    
    const deleteMsg = <span style={{color:'red'}}>Item deleted</span>
    const columns = [
      {
        title: 'Image',
        dataIndex: 'imrego.imgURL',
        render: imgURL =>{ 
          return(
            <Dropdown overlay={(imgURL)?fullImg(imgURL):<p/>} placement="bottomLeft">
              <img 
              src={(imgURL)? imgURL : '/noitemimg.png'} 
              alt='Item'
              style={{maxHeight:'100px', maxWidth:'100px'}}/>
            </Dropdown>
          )
        }
      },
      {
        title: 'IMREGO',
        dataIndex: 'imrego.imNum',
        render: data => (data) ? data : deleteMsg
      },
      {
        title: 'Title',
        dataIndex: 'imrego.title',
        render: data => (data) ? data : deleteMsg
      }, 
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status, record) => {
          const SL = status.length-1;
          record.key=record._id
          const menu = (record.imrego!==null)?
          <p>
            <Button type='danger' onClick={(e)=>{remove(record.key)}}>Remove</Button>

            <Button type={(status[SL]==='Holding')?'primary':'secondary'} 
            onClick={(e)=>{updateFoundItemStatus(record.key, 'Holding')}}>
              Holding
            </Button>
            
            <Button type={(status[SL]==='Settled')?'primary':'secondary'} 
            onClick={(e)=>{updateFoundItemStatus(record.key, 'Settled')}}>
              Settled
            </Button>
            
            {/* <Button type={(status[SL]==='Disposed')?'primary':'secondary'} 
            onClick={(e)=>{updateFoundItemStatus(record.key, 'Disposed')}}>
              Disposed
            </Button>
            
            <Button type={(status[SL]==='Lost')?'primary':'secondary'} 
            onClick={(e)=>{updateFoundItemStatus(record.key, 'Lost')}}>
              Lost
            </Button>
            
            <Button type={(status[SL]==='Transfered')?'primary':'secondary'} 
            onClick={(e)=>{updateFoundItemStatus(record.key, 'Transfered')}}>
              Transfered
            </Button> */}

          </p>
          :<p><Button type='danger' onClick={(e)=>{remove(record.key)}}>Remove</Button></p>
          return(
            <Dropdown disabled={false} overlay={menu} placement="bottomRight">
              <Button type='primary'>{status[SL]}</Button>
            </Dropdown>
          )
       }
      },
    ];
    
    const data = this.props.FoundLists;
    
    function itemDescription(value) {
      if(value.ownerData!==null){
        const {ownerData} = value;
        const dateIndex = value.date.length-1;
        const modifieddate = moment(value.date[dateIndex]).format(config.DATE_FORMAT);
        const modifiedtime = moment(value.date[dateIndex]).format(config.TIME_FORMAT);
        const firstmodifieddate = moment(value.date[0]).format(config.DATE_FORMAT);
        const firstmodifiedtime = moment(value.date[0]).format(config.TIME_FORMAT);
        const date= `${modifieddate}-${modifiedtime}`
        const firstDate= `${firstmodifieddate}-${firstmodifiedtime}`;

        const ownerName = (ownerData!==null) ? ownerData.displayName: <i>undisclosed</i>;
        const email= (ownerData!==null)?
              ((ownerData.email!==undefined)?ownerData.email:<i>undisclosed</i>)
              : <i>undisclosed</i>;
        const contact= (ownerData!==null)?
              ((ownerData.contact!==undefined)?ownerData.contact:<i>undisclosed</i>)
              : <i>undisclosed</i>;
        const address= (ownerData!==null)?
              ((ownerData.address!==undefined)?ownerData.address:<i>undisclosed</i>)
              : <i>undisclosed</i>;

        return (
          <div>
            <p><b>Found on: </b> <i>{firstDate} </i>   <b> Last Activity: </b> <i>{date}</i></p> 
            <p><b>Catagory: </b>{value.imrego.catagory}</p>
            <p><b>Description: </b>{value.imrego.description}</p>
            <p><b>Owner's Name: </b>{ownerName}</p>
            <p><b>Email: </b>{email}</p>
            <p><b>Contact: </b>{contact}</p>
            <p><b>Address: </b>{address}</p>
          </div>
        )
      } else return (deleteMsg)
    }

    return(
      // <Spin spinning={this.props.fetching || false}>
        <Row style={Style.mainRow} 
        justify="space-around" 
        align="middle">
      
          <Table 
          loading={this.props.fetching}
          style={{width: '100%' }}
          columns={columns} 
          dataSource={data}
          expandRowByClick={false}
          expandedRowRender={(record) => itemDescription(record)} 
          />
        </Row>
      // </Spin>
    )
  
}
}

const returnState = (store)=>{
  return({...store.FoundLists})
}

export default connect(returnState)(FoundList);
