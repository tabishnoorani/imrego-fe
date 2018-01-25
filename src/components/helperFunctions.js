import {Modal } from 'antd';
const confirm = Modal.confirm;

export function showConfirm(props) {
    confirm({
        title: props.title||'title',
        content: props.content||'content',
        okText: 'Yes',
        okType: props.okType||'danger',
        cancelText: 'No',
        onOk() {
            props.onOk()||console.log('OK');
        },
        onCancel() {
            props.onCancel()||console.log('Cancel');
        },
    });
}