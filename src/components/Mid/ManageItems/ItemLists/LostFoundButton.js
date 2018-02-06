import React from 'react';
import {Button, Tooltip} from 'antd';
import {updateImregoStatus} from '../../../../store/actions';

const LostFoundButton = (props) =>{
    
    const lost = (props.status!=='Normal')

    function updateStatus() {
        // console.log(props._id)
        const newStatus = (lost)?"Normal":"Lost"
        updateImregoStatus(props._id, newStatus)
    }

    const buttonText= (lost) ? "FOUND IT" : "LOST IT"
    return(
        <Tooltip placement="bottom" title={buttonText}>
            <Button
            loading={props.loadingLFB}
            style={{width:'100%'}}
            type={(lost) ? "secondary" : "primary"} 
            onClick = {updateStatus}>
            {buttonText}
            </Button>
        </Tooltip>
    );
}

export default LostFoundButton;