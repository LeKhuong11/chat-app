import React, { useContext } from 'react'
import { userChat } from '../types/chat';
import { useFetchPartner } from '../hooks/useFetchPartner';
import { Avatar, message } from 'antd';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ChatContext } from '../context/ChatContext';


function UserChat({ chat, user }: userChat) {
  const { partner } = useFetchPartner({chat, user});
  const { handleClickDeleteChat, handleSetCurrentChat } = useContext(ChatContext);
  const [contextHolder] = message.useMessage();


  return (
    <div className="group/item cursor-pointer hover:bg-blue-900 rounded transition duration-300 ease-in-out" onClick={() => handleSetCurrentChat(chat)}>
      <div className="border-b flex items-center justify-between p-3  bottom-2">
        <div className='flex items-center'>
          <Avatar size={40} style={{ backgroundColor: '#FF9900' }}>
            {partner?.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className='font-bold px-2 text-white'>{partner?.name}</p>
            <p className='text-white text-xs px-2'></p>
          </div>
        </div>
        <div className="hover:bg-sky-700 p-1 rounded-sm group/edit invisible group-hover/item:visible" onClick={(event) => handleClickDeleteChat(event, chat._id)}>
          <HiOutlineDotsVertical style={{color: 'white'}}  />
        </div>
      </div>
    </div>
  ) 
}

export default UserChat;
