import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'
import ListGroupChat from './ListGroupChat'
import UserInfo from './UserInfo'

function Sidebar() {
    const SidebarStyled = styled.div`
        backgroundColor: #306EB8,
        color: white,
        height: 100vh
    `
  return (
    <SidebarStyled>
        <Row>
            <Col span={24}><UserInfo /></Col>
            <Col span={24}><ListGroupChat /></Col>
        </Row>
    </SidebarStyled>
  )
}

export default Sidebar