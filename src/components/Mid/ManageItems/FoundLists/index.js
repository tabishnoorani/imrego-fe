import React from 'react';
import { 
  Button, 
  Dropdown,  
  Row,  
  Spin, 
  Table, 
} from 'antd';
import { initializeFoundList } from '../../../../store/actions/index';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import config from '../../../../config';

class FoundList extends React.Component {
  componentWillMount(){
    if (!this.props.FoundItemInitialized){
      initializeFoundList();
    }
  }

  render() {
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
    
    const columns = [
      {
        title: 'Image',
        dataIndex: 'imgURL',
        render: imgURL => 
          <Dropdown overlay={(imgURL)?fullImg(imgURL):<p/>} placement="bottomLeft">
            <img 
            src={(imgURL)?imgURL:'/noitemimg.png'} 
            alt='Item'
            style={{maxHeight:'100px', maxWidth:'100px'}}/>
          </Dropdown>
      },
      {
        title: 'IMREGO',
        dataIndex: 'imrego',
      },
      {
        title: 'Title',
        dataIndex: 'title',
      }, 
      {
        title: 'Status',
        dataIndex: 'status',
        render: (status, record) => {
          const menu = 
          <p>
            <Button type='primary' onClick={(e)=>{console.log({status, record})}}>Holding</Button>
            <Button>Holding</Button>
            <Button>Holding</Button>
            <Button>Holding</Button>
          </p>
          return(
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type='primary'>{status}</Button>
            </Dropdown>
          )
        }
      },
    
    ];
    
    const data = _.map([...this.props.FoundLists], function (value){
      const dateIndex = value.date.length-1;
      const modifieddate = moment(value.date[dateIndex]).format(config.DATE_FORMAT);
      const modifiedtime = moment(value.date[dateIndex]).format(config.TIME_FORMAT);
      const {ownerData, imrego} = value;
      return ({
        key: value._id,
        status: value.status,
        date: `${modifieddate} - ${modifiedtime}`,
        
        imrego: (imrego!==null)?imrego.imNum:'ITEM DELETED BY OWNER',
        title: (imrego!==null)?imrego.title:'ITEM DELETED BY OWNER',
        catagory: (imrego!==null)?imrego.catagory:'ITEM DELETED BY OWNER',
        description: (imrego!==null)?
                      (imrego.description!==undefined)?imrego.description : <i>undisclosed</i>
                      :'ITEM DELETED BY OWNER',
        imgURL: (imrego!==null)?imrego.imgURL:'/noitemimg.png',

        ownerName: (ownerData!==null)?ownerData.displayName: <i>undisclosed</i>,
        email: (ownerData!==null)?
                ((ownerData.email!==undefined)?ownerData.email:<i>undisclosed</i>)
                : <i>undisclosed</i>,
        contact: (ownerData!==null)?
                ((ownerData.contact!==undefined)?ownerData.contact:<i>undisclosed</i>)
                : <i>undisclosed</i>,
        address: (ownerData!==null)?
                ((ownerData.address!==undefined)?ownerData.address:<i>undisclosed</i>)
                : <i>undisclosed</i>,
      });
    });
    
    function itemDescription(record) {
      return (
        <div>
          <p><b>Found on: </b> <i>{record.date}</i>  <b>Catagory: </b>{record.catagory}</p>
          <p><b>Description: </b>{record.description}</p>
          <p><b>Owner's Name: </b>{record.ownerName}</p>
          <p><b>Email: </b>{record.email}</p>
          <p><b>Contact: </b>{record.contact}</p>
          <p><b>Address: </b>{record.address}</p>
        </div>
      )
    }

    return(
      <Spin spinning={this.props.deleting || false}>
        <Row style={Style.mainRow} 
        justify="space-around" 
        align="middle">
      
          <Table 
          style={{width: '100%' }}
          columns={columns} 
          dataSource={data}
          // expandRowByClick={true}
          expandedRowRender={(record) => {
              return(
                itemDescription(record)
              )
            }
          } 
          />
        </Row>
      </Spin>
    )
  
}
}

const returnState = (store)=>{
  return({...store.FoundLists})
}

export default connect(returnState)(FoundList);
