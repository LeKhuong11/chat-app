import React from 'react'
import { useUserrAuth } from '../../context/UserAuthContext'

function ChatRoom() { 
  const { user } = useUserrAuth();

  console.log(user);
  return (
    <div>
        Thiss is Chat room
    </div>
  )
}

export default ChatRoom