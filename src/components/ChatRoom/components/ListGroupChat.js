import { Collapse, Typography } from 'antd'
import React from 'react'
const { Panel } = Collapse;

function ListGroupChat() {
  return (
    <Collapse defaultActiveKey={['1']}>
        <Panel header='Danh Sach Cac Phong' key='1'>
            <Typography.Text>Room 1</Typography.Text>
            <Typography.Text>Room 2</Typography.Text>
            <Typography.Text>Room 3</Typography.Text>
        </Panel>
    </Collapse>
  )
}

export default ListGroupChat