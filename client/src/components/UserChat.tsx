import React, { useContext } from 'react'
import { userChat } from '../types/chat';
import { useFetchPartner } from '../hooks/useFetchPartner';
import { Avatar } from 'antd';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ChatContext } from '../context/ChatContext';
import { useFetchLatestMessage } from '../hooks/useFetchLatestMessage';
import { unReadNotifitcation } from '../utils/unReadNotification';


function UserChat({ chat, user }: userChat) {
  const { handleClickDeleteChat, handleSetCurrentChat, onlineUsers, notifications } = useContext(ChatContext);
  const { partner } = useFetchPartner({chat, user});
  const { latestMessage } = useFetchLatestMessage(chat._id);

  const isOnline = onlineUsers?.some((user) => user?.userId === partner?._id);

  const unreadNotifications = unReadNotifitcation(notifications);

  const userUnread = unreadNotifications.filter(user => user.senderId === partner?._id);
  
  
  return (
    <div className="group/item cursor-pointer hover:bg-blue-900 rounded transition duration-300 ease-in-out" onClick={() => handleSetCurrentChat(chat)}>
      <div className="border-b flex items-center justify-between p-3 bottom-2">
        <div className="flex items-center">
          <div className="relative">
            <Avatar size={40} style={{ backgroundColor: '#FF9900' }}>
              {partner?.name.charAt(0).toUpperCase()}
            </Avatar>
            {isOnline ? <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> : ''}
          </div>
          <div className="ml-2">
            <p className={userUnread.length > 0 ? "font-bold text-white" : "text-white"}>{partner?.name}</p>
            <p className={userUnread.length > 0 ? "font-bold text-slate-400 text-xs truncate w-40" : "text-slate-400 text-xs truncate w-40"}>{latestMessage?.content}</p>
          </div>
        </div>
        <div className="hover:bg-sky-700 p-1 rounded-sm group/edit invisible group-hover/item:visible" onClick={(event) => handleClickDeleteChat(event, chat._id)}>
          <HiOutlineDotsVertical style={{color: 'white'}} />    
        </div>
        {userUnread.length > 0 ? 
          <div>
            <p className='text-xs bg-amber-500 px-1 rounded-full'>{userUnread.length}</p>
        </div> : ''
        }
      </div>
    </div>
  ) 
}

export default UserChat;
