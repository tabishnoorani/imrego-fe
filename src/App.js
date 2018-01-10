import React, { Component } from 'react';
import axios from 'axios';
import Signin from './components/Signin';
import Signup from './components/Signup';
import './App.css';

import config from './config';

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      data:""
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData (event) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bnNpZ25lZFRva2VuIjp7InNpZCI6IjVhNTQxOTY3NzkxNTdjMWEyODllM2UxNyIsInVpZCI6IjVhNTJkNGMwYjk1OWZmMDQyODUxNjI4NiJ9LCJpYXQiOjE1MTU0NjA5Njd9.1J4tKvWB7oo4unPPZfPBTYfurQqZgeCO_JaF6Q5mPuw';
    axios.get(`${config.HOST_URL}/api`, 
            {headers: { authorization: `Bearer ${token}`}})
    .then((res)=>{
      this.setState ({data: res.data.msg})
    })
    .catch(function(err){});
  }

  render() {
    return (
      <div className="App">
        <Signin/>
        <Signup/>
        <button onClick={this.fetchData}>Fetch Data</button>
        <label>{this.state.data}</label>
      </div>
    );
  }
}

export default App;
