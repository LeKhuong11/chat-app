import React from 'react'
import { IoIosMore } from "react-icons/io";
import { PiVideoCameraFill } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import UserChat from '../components/UserChat';

function ListChat() {
  const avatar = require('../assets/avatar.jpg');
  return (
    <div className="w-1/4 h-5/6 bg-gray-900 bg-opacity-50 backdrop-blur-strong rounded-lg mr-1 p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img className='rounded-full w-10' src={avatar} alt="Avatar" />
          <h3 className='font-bold px-2 font-mono text-white'>Khuong</h3>
        </div>
        <div className="flex">
          <div className="px-3 cursor-pointer">
            <PiVideoCameraFill fontSize={22} fontWeight={700} className='text-white' />
          </div>
            <IoIosMore fontSize={22} fontWeight={700} className='text-white' />
        </div>
      </div>

      <div className="searching my-3 flex items-center">
        <div className='w-11/12 rounded-md bg-custom-bg p-1.5 px-2 text-custom-size flex'>
          <GoSearch fontSize={17} fontWeight={700} className='text-white mr-2 ml-1' />
          <input type="text" placeholder='Search' className='border-none w-11/12 h bg-transparent outline-none text-white' />
        </div>
        
        <div className='mx-2 bg-custom-bg p-1 rounded-md cursor-pointer'>
          <AiOutlinePlus fontSize={22} fontWeight={700} className='text-white' />
        </div>
      </div>

      <div className='px-3'>
        <UserChat withUser='Joinny Deep' message='you: Hellow world' />
        <UserChat withUser='Kelvin' message='How are you today!' />
        <UserChat withUser='Robin Hood' message='Thanks!' />
      </div>
    </div>
  )
}

export default ListChat;