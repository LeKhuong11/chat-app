import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import io, { Socket, Manager }  from 'socket.io-client';

const socket = io("http://localhost:3002");

function Text() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [showChat, setShowChat] = useState<boolean>(false);
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('message', { room: room, message: message}, );
      setMessage('');
    }
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('joinRoom', room);
    console.log(room);
    
    setShowChat(true);
  } 
  
  useEffect(() => {
      socket.off('message');
      socket.on('message', (data: { room: string, message: string }) => {  
        console.log(data);
        console.log(room);
        
          setMessages((prevMessages) => [...prevMessages, data.message]);
   
      });

    return () => {
      socket.off('connect');
    }
  }, []);

  return (
    <div className="App">
       <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      {!showChat ? <form onSubmit={joinRoom}>
        <label htmlFor="">Join room</label> <br />
        <input
          type="room"
          value={room}
          placeholder='Type name room...'
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Join</button>
      </form> : ''}
      {showChat ? <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form> : ''}
    </div>
  );
}

export default Text;
