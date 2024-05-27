import React from 'react'
import { IoMdCall } from 'react-icons/io';
import { PiVideoCameraFill } from 'react-icons/pi';
import { IoSend } from "react-icons/io5";

function ContentChat() {
    const avatar = require('../assets/avatar.jpg');
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
                <div className="message w-9/12 flex items-start my-2">
                    <img src={avatar} alt="Avaatar" className='rounded-full w-9 mr-2' />
                    <div>
                        <div className="texts bg-custom-bg p-2 rounded-ss-none rounded-md">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs'>1 min ago</p>
                    </div>
                </div>
                <div className="message w-9/12 flex items-center self-end my-2 mx-3">
                    <div>
                        <div className="texts bg-sky-500 rounded-md rounded-ee-none p-2">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs text-end'>1 min ago</p>
                    </div>
                </div>
                <div className="message w-9/12 flex items-start my-2">
                    <img src={avatar} alt="Avaatar" className='rounded-full w-9 mr-2' />
                    <div>
                        <div className="texts bg-custom-bg p-2 rounded-ss-none rounded-md">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs'>1 min ago</p>
                    </div>
                </div>
                <div className="message w-9/12 flex items-center self-end my-2 mx-3">
                    <div>
                        <div className="texts bg-sky-500 rounded-ee-none rounded-md p-2">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs text-end'>1 min ago</p>
                    </div>
                </div>
                <div className="message w-9/12 flex items-start my-2">
                    <img src={avatar} alt="Avaatar" className='rounded-full w-9 mr-2' />
                    <div>
                        <div className="texts bg-custom-bg p-2 rounded-ss-none rounded-md">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs'>1 min ago</p>
                    </div>
                </div>
                <div className="message w-9/12 flex items-center self-end my-2 mx-3">
                    <div>
                        <div className="texts bg-sky-500 rounded-md rounded-ee-none p-2">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs text-end'>1 min ago</p>
                    </div>
                </div>
                <div className="message w-9/12 flex items-center self-end my-2 mx-3">
                    <div>
                        <div className="texts bg-sky-500 rounded-md rounded-ee-none p-2">
                            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio architecto doloremque sint eius quae rem necessitatibus voluptates. Distinctio quae, sunt nobis ipsa unde quidem alias quibusdam. Perspiciatis, dicta consequatur.</p>
                        </div>
                        <p className='text-white text-xs text-end'>1 min ago</p>
                    </div>
                </div>
            </div>

            <div className='sendMessage flex py-3 justify-center border-t border-gray-600'>
                <input type="text" placeholder='Type something ...' className='border-none w-10/12 h bg-custom-bg outline-none text-white px-5 py-2 rounded-md'/>
                <div className=' bg-teal-500 flex items-center px-4 ml-3 cursor-pointer rounded-md '>
                    <button type="button"><IoSend fontSize={22} fontWeight={700} className='text-white' /></button>
                </div>
            </div>
        </div>
    );
}

export default ContentChat;