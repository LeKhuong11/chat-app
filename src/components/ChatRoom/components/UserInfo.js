import { Avatar, Button, Typography } from 'antd'
import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserInfo() {
    const navigate = useNavigate()
    const handleClickLogout = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            navigate('login')
        }).catch((error) => {
            // Error
        });
    }
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 20}}>
        <div>
            <Avatar>A</Avatar>
            <Typography.Text>ABC</Typography.Text>
        </div>
        <Button onClick={handleClickLogout}>Đăng Xuất</Button>
    </div>
  )
}

export default UserInfo