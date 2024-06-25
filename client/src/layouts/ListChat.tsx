import React, { useContext, useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { PiVideoCameraFill } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import UserChat from '../components/UserChat';
import { useAuth, UserContext } from '../context/AuthContext';
import { AutoComplete, Modal } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import UserApi from '../apis/User';


const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});


function ListChat() {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const avatar = require('../assets/avatar.jpg');
  const userApi = new UserApi();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getPanelValue = (searchText: string) => {
    let users: any = [];
    
    if (searchText) {
      userApi.findUser(searchText)
        .then( res => {
          users = res.users
        }).catch(error => {
          console.error('Login error:', error);
        });
    }

    return !searchText ? [] : [mockVal('searchText'), mockVal('searchText', 2), mockVal('searchText', 3)];
  }

  return (
    <div className="w-1/4 h-5/6 bg-gray-900 bg-opacity-50 backdrop-blur-strong rounded-lg mr-1 p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img className='rounded-full w-10' src={avatar} alt="Avatar" />
          <h3 className='font-bold px-2 font-mono text-white'>{user?.name}</h3>
        </div>
        <div className="flex">
          <div className="px-3 cursor-pointer">
            <PiVideoCameraFill fontSize={22} fontWeight={700} className='text-white' />
          </div>
            <IoIosMore fontSize={22} fontWeight={700} className='text-white' />
        </div>
      </div>

      <div className="search-user my-3 flex items-center">
        <div className='w-11/12 rounded-md bg-custom-bg p-1.5 px-2 text-custom-size flex'>
          <GoSearch fontSize={17} fontWeight={700} className='text-white mr-2 ml-1' />
          <input type="text" placeholder='Search' className='border-none w-11/12 h bg-transparent outline-none text-white' />
        </div>
        
        <div className='mx-2 bg-custom-bg p-1 rounded-md cursor-pointer' onClick={showModal}>
          <AiOutlinePlus fontSize={22} fontWeight={700} className='text-white' />
        </div>
        <Modal title="Tìm kiếm bạn bè" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <AutoComplete
            options={options}
            style={{ width: '100%'}}
            onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="Nhập tên bạn bè"
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
          />
        </Modal>
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