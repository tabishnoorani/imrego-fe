import React from 'react';
import { Row, Col } from 'antd';
import Signin from '../Signin';
import Signup from '../Signup';


const SignInUp = (props) => {
  return(
  <Row type="flex" justify="end" align="middle">
    <Col>
      <Signin/>
    </Col>
    <Col>
      <Signup/>
    </Col>
  </Row>
  );
}

export default SignInUp;