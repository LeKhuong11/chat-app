import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoMdCall } from 'react-icons/io';
import { PiVideoCameraFill } from 'react-icons/pi';
import { IoSend } from "react-icons/io5";
import Message from '../components/Message';
import { io } from 'socket.io-client';
import { ChatContext } from '../context/ChatContext';
import { UserContext } from '../context/AuthContext';
import { Spin } from 'antd';

const socket = io("ws://localhost:3002");


function ContentChat() {
    const avatar = require('../assets/avatar.jpg');
    const { messages, isMessageLoading, currentChat, sendMessage } = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Scroll to bottom when messages change

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleClickSendMessage = () => {
        const data = {
            room: '123',
            message: message
        };
        // Emit message via socket
        socket.emit('message', data);
        // Send message via context
        sendMessage({ message, userId: user._id, chatId: currentChat._id });
        setMessage('');
    };

    return (
        <div className="w-3/5 h-5/6 bg-gray-900 bg-opacity-50 backdrop-blur-strong rounded-lg mr-1 p-3">
            <div className="border-b flex items-center justify-between py-3">
                <div className='flex items-center'>
                    <img className='rounded-full w-12' src={avatar} alt="Avatar" />
                    <div>
                        <p className='font-bold px-2 text-white'>Robin Hood</p>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <IoMdCall fontSize={22} fontWeight={700} className='text-white' />
                    </div>
                    <div className="px-3 cursor-pointer">
                        <PiVideoCameraFill fontSize={22} fontWeight={700} className='text-white' />
                    </div>
                    <div className="px-3 cursor-pointer">
                        <PiVideoCameraFill fontSize={22} fontWeight={700} className='text-white' />
                    </div>
                </div>
            </div>

            <div className="center h-4/5 overflow-scroll overflow-x-hidden flex flex-col mt-3">
                {isMessageLoading ?
                    <div className='mt-5'>
                        <Spin></Spin>
                    </div> : messages && messages.map((message, index) => (
                        <Message
                            sentBy={`${message.senderId === user._id ? "me" : "other"}`}
                            avatar={avatar} content={message.content}
                            createdAt={message.createdAt}
                            key={message._id}
                        />
                    ))}
                <div ref={messagesEndRef} /> {/* Ref to the end of messages */}
            </div>

            <div className='sendMessage flex py-3 justify-center border-t border-gray-600'>
                <input onChange={handleChangeMessage} type="text" value={message} placeholder='Type something ...' className='border-none w-10/12 h bg-custom-bg outline-none text-white px-5 py-2 rounded-md' />
                <div className=' bg-teal-500 flex items-center px-4 ml-3 cursor-pointer rounded-md '>
                    <button onClick={handleClickSendMessage} type="button"><IoSend fontSize={22} fontWeight={700} className='text-white' /></button>
                </div>
            </div>
        </div>
    );
}

export default ContentChat;