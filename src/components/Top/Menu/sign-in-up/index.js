import React from 'react';
import { Row, Col } from 'antd';
import Signin from './Signin';
import Signup from './Signup';


const SignInUp = (props) => {
  return(
  <div>
    {(props.auth===false && props.loading===false)?
    <Row type="flex" justify="end" align="middle">
      <Col>
        <Signin/>
      </Col>
      <Col>
        <Signup/>
      </Col>
    </Row>
    :""}
  </div>
  );
}

export default SignInUp;