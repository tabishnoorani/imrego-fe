import React from 'react';
import NotAuth from '../NotAuth';

const Home = (props)=>{
    const {auth} = props;
    if (auth!==false){
        return (
            <div>Home New</div>
        )
    } else return (<NotAuth />)
}

export default Home;