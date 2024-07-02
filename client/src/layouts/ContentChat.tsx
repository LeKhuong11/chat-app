import React, { useEffect, useState } from 'react'
import { IoMdCall } from 'react-icons/io';
import { PiVideoCameraFill } from 'react-icons/pi';
import { IoSend } from "react-icons/io5";
import Message from '../components/Message';
import { io } from 'socket.io-client';

const socket = io("ws://localhost:3002");

function ContentChat() {
    const avatar = require('../assets/avatar.jpg');
    const [message, setMessage] = useState<any>();

    useEffect(() => {
        socket.off('message');
        socket.on('message', (data: { room: string, message: string }) => {  
            console.log(data);
            
          });

        return () => {
            socket.off('connect');
        }
    }, [])

    const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    
    }

    const handleClickSendMessage = () => {
        const data = {
            room: '123',
            message: message
        }
        socket.emit('message', data)

        console.log(data);
        
    }
    
    return (
        <div className="w-3/5 h-5/6 bg-gray-900 bg-opacity-50 backdrop-blur-strong rounded-lg mr-1 p-3">
            <div className="border-b flex items-center justify-between py-3">
                <div className='flex items-center'>
                    <img className='rounded-full w-12' src={avatar} alt="Avatar" />
                    <div >
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

            <div className="center h-4/5 overflow-scroll overflow-x-hidden flex flex-col">
                <Message sentBy='other' avatar={avatar} content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />
                
                <Message sentBy='me' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />
                
                <Message sentBy='other' avatar={avatar} content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />

                <Message sentBy='me' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />

                <Message sentBy='other' avatar={avatar} content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />
                
                <Message sentBy='me' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />
                <Message sentBy='me' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.' />

            </div>

            <div className='sendMessage flex py-3 justify-center border-t border-gray-600'>
                <input onChange={handleChangeMessage} type="text" placeholder='Type something ...' className='border-none w-10/12 h bg-custom-bg outline-none text-white px-5 py-2 rounded-md'/>
                <div className=' bg-teal-500 flex items-center px-4 ml-3 cursor-pointer rounded-md '>
                    <button onClick={handleClickSendMessage} type="button"><IoSend fontSize={22} fontWeight={700} className='text-white' /></button>
                </div>
            </div>
        </div>
    );
}

export default ContentChat;