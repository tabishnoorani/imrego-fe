import React from 'react';
import {Button} from 'antd';
import {updateImregoStatus} from '../../../../store/actions';

const LostFoundButton = (props) =>{
    
    const lost = (props.status!=='Normal')

    function updateStatus() {
        // console.log(props._id)
        const newStatus = (lost)?"Normal":"Lost"
        updateImregoStatus(props._id, newStatus)
    }

    return(
        <Button
        loading={props.loadingLFB}
        style={{width:'100%'}}
        type={(lost) ? "secondary" : "primary"} 
        onClick = {updateStatus}>
            {(lost) ? "FOUND IT" : "LOST IT"}
        </Button>
    );
}

export default LostFoundButton;