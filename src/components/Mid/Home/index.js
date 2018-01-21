import React from 'react';
import NotAuth from '../NotAuth';
import config from '../../../config';

const Home = (props)=>{
    window.document.title=`${config.APP_NAME} - Home`
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Home New</div>
        )
    } else return (<NotAuth />)
}

export default Home;