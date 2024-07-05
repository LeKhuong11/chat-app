import React from 'react'
import { ChatType } from '../types/chat';
import { User } from '../types/user';
import { useFetchPartner } from '../hooks/useFetchPartner';
import { Avatar } from 'antd';

const avatar = require('../assets/avatar.jpg');

type userChat = {
  chat: ChatType,
  user: User
}

function UserChat({ chat, user }: userChat) {
  const { partner } = useFetchPartner({chat, user});
  
  return (
    <div className="flex items-center py-3 bottom-2 border-b">
      <Avatar size={40} style={{ backgroundColor: '#87d068' }}>
        {partner?.name.charAt(0).toUpperCase()}
      </Avatar>
      <div>
        <p className='font-bold px-2 text-white'>{partner?.name}</p>
        <p className='text-white text-xs px-2'></p>
      </div>
    </div>
  )
}

export default UserChat;
