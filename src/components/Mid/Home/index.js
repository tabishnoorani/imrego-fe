import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';
import {testPush} from '../../../store/actions';

function handleClick(e){
    testPush('/settings');
}

const Home = (props)=>{
    window.document.title=`${config.APP_NAME} - Home`
    const {auth} = props;
    if (auth!==false){
        return (
            <div>
            <div>Home New</div>
            <button onClick={handleClick}>Test Push to settings</button>
            </div>
        )
    } else return (<NotAuth />)
}

export default Home;