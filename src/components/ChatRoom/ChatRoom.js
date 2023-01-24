import React from 'react'
import { useUserrAuth } from '../../context/UserAuthContext'
import { getAuth, signOut } from "firebase/auth";

import { Col, Row } from 'antd';
import Sidebar from './components/Sidebar';
import ChatIndex from './components/ChatIndex';
function ChatRoom() { 
  const { user } = useUserrAuth();

  console.log(user);
  return (
    <div>
        <Row>
          <Col span={6}><Sidebar /></Col>
          <Col span={18}><ChatIndex /></Col>
        </Row>
    </div>
  ) 
}

export default ChatRoom