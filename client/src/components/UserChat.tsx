import React from 'react'
import { ChatType } from '../types/chat';
import { User } from '../types/user';
import { useFetchPartner } from '../hooks/useFetchPartner';
import { Avatar } from 'antd';

type userChat = {
  chat: ChatType,
  user: User
}

function UserChat({ chat, user }: userChat) {
  const { partner } = useFetchPartner({chat, user});
  
  return (
    <div className=" cursor-pointer hover:bg-blue-900 rounded transition duration-300 ease-in-out">
      <div className="border-b flex items-center p-3  bottom-2">
        <Avatar size={40} style={{ backgroundColor: '#FF9900' }}>
          {partner?.name.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <p className='font-bold px-2 text-white'>{partner?.name}</p>
          <p className='text-white text-xs px-2'></p>
        </div>
      </div>
    </div>
  ) 
}

export default UserChat;
