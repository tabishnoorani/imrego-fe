import React from 'react';
import { Spin, Table, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import {fetchNotifications} from '../../../store/actions';
import {history} from '../../../store/';

class Notifications extends React.Component {
    componentWillMount(){
        fetchNotifications();
    }

    render() {
        const { data, loading, next, pathname } = this.props
        const style = {
            bordered: false,
            // loading: false,
            pagination: false,
            size: 'small',
            // expandedRowRender: undefined,
            // title: 'Here is the title',
            // rowSelection: {},
            showHeader: false,
            footer: ()=>{
                const toReturn = (next!==null) ? 
                    <Button 
                    type="primary" 
                    style = {{width: '100%',}}
                    size='large' 
                    onClick={()=>{fetchNotifications(this.props.next)}}>
                        Load more
                    </Button>
                    : null;
                return (toReturn)
            },
        }

        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                width: 90,
                render: data => {
                    const date = moment(data).format('DD-MM-YYYY');
                    const time = moment(data).format('hh:mm');
                    return(
                        <p>{date} <i >{time}</i></p>
                    )
                }
            }, 
            {
                title: 'Description',
                dataIndex: 'title',
                key: 'description',
                width: 250,
                render:  (title, data) => <p>
                    Some one has found your <b>{data.data.title}</b>. 
                    <br/> <i>IM# {data.data.imNum}</i>.
                </p>
            },
        ];
          console.log(pathname)
        return(
            <Modal
                title="Notifications"
                visible={(pathname==='/notifications')}
                onCancel={()=>{history.goBack()}}
                footer={null}
                destroyOnClose={true}
                mask={false}
                // width={350}
                bodyStyle={{
                    padding:'0px',
                }}
                style={{
                    top: 50,
                    // right: 10,
                }}
            >
            <Spin size='large' tip="Loading..." spinning = {false}>
                <Table 
                {...style} 
                scroll={{ y: 450 }} 
                loading={loading} 
                rowKey='_id' 
                dataSource={data} 
                columns={columns} />
            </Spin>
            </Modal>
        )
    }
}
const returnState = (store) => {
    return({
        loading: store.Notification.loading,
        data: store.Notification.notificationArray,
        next: store.Notification.next,
        pathname: store.router.location.pathname,
    })
}

export default connect(returnState)(Notifications)