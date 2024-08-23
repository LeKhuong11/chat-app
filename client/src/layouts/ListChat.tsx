import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import UserChat from '../components/UserChat';
import { UserContext } from '../context/AuthContext';
import { AutoComplete, Badge, Modal, Spin } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import UserApi from '../apis/user';
import useDebounce from '../hooks/useDebounce';
import { ChatContext } from '../context/ChatContext';
import { ChatType } from '../types/chat';
import { User } from '../types/user';
import ChatApi from '../apis/Chat';
import { GoBellFill } from "react-icons/go";

const userApi = new UserApi();
const chatApi = new ChatApi();

function ListChat() {
  const { user } = useContext(UserContext);
  const { chats, setChats, isChatLoading, handleSetCurrentChat } = useContext(ChatContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<{ value: string }>({value: ''});
  const [usersFinded, setUserFinded] = useState<User[]>([]);
  const debouncedValue = useDebounce(searchText, 500);

  const avatar = require('../assets/avatar.jpg');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFindUser = (value: string) => {
    
    setSearchText({value});
  }

  const handleSelectedUser = async (value: string, option: { value: string, key: string }) => {
    chatApi.createChat({firstId: user._id, secondId: option.key})
      .then(chat => {
        setChats((prev: ChatType[]) => [...prev, chat]);
        handleSetCurrentChat(chat);
      });
    
    setIsModalOpen(false);
  };

  useEffect(() => {
    if(searchText.value) {
      userApi.findUser(searchText.value)
        .then( res => {
          const users = res.users.map((user: User) => ({
            _id: user._id,
            name: user.name,
            email: user.email
          }))
          
          setUserFinded(users)
        }).catch(error => {
          console.error('Error:', error);
        });
    }
    
  }, [debouncedValue]);


  return (
    <div className="w-1/4 h-5/6 bg-gray-900 bg-opacity-50 backdrop-blur-strong rounded-lg mr-1 p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img className='rounded-full w-10' src={avatar} alt="Avatar" />
          <h3 className='font-bold px-2 font-mono text-white'>{user?.name}</h3>
        </div>
        <div className="flex">
          <Badge count={5}>
            <GoBellFill fontSize={30} />
          </Badge>
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
            options={usersFinded.map(user => ({
              value: user.name + `(${user.email})`,
              key: user._id, 
            }))}
            style={{ width: '100%'}}
            onSearch={(value) => handleFindUser(value)}
            onSelect={handleSelectedUser}
            placeholder="Nhập tên bạn bè"
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
          />
        </Modal>
      </div>

      <div>
        {
          isChatLoading ? 
            <div className='flex justify-center items-center h-40'>
              <Spin></Spin>
            </div> : 
            chats?.map((item: ChatType) => (
              <div key={item._id}>
                <UserChat chat={item} user={user} />
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default ListChat;