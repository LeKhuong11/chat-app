import React from 'react'

interface userChat {
  withUser: string,
  message: string,
  avatar?: string
}

function UserChat(chat: userChat) {
    const avatar = require('../assets/avatar.jpg');
  return (
    <div className="flex items-center py-3 bottom-2 border-b">
      <img className='rounded-full w-10' src={avatar} alt="Avatar" />
      <div>
        <p className='font-bold px-2 text-white'>{chat.withUser}</p>
        <p className='text-white text-xs px-2'>{chat.message}</p>
      </div>
    </div>
  )
}

export default UserChat;
