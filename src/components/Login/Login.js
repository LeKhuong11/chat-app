import React, { useState } from 'react'
import { Col, Row, Typography } from 'antd'
import GoogleButton from 'react-google-button'
import { useUserrAuth } from '../../context/UserAuthContext'

function Login() {
  const [ error, setError ] = useState("");
  const { googleSignIn, user } = useUserrAuth();

  const handleCLickLogin = async (e) => {
    e.preventDefault();
    await googleSignIn();
  }

  console.log(user);
  return (
    <div>
        <Row justify="center" style={{height: 400}}>
            <Col span={8} flex="none">
                <Typography.Title style={{textAlign: 'center' }} level={3}>Chat App</Typography.Title>
                <GoogleButton onClick={handleCLickLogin} />
                {error && <h3>{error}</h3>}
            </Col>
        </Row>
    </div>
  )
}

export default Login