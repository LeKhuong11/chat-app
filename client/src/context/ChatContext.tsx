import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { ChatContextType, ChatType } from "../types/chat";
import ChatApi from "../apis/Chat";
import { OnlineUsers, User } from "../types/user";
import MessageApi from "../apis/Message";
import { MessageRequest, MessageType } from "../types/message";
import { io, Socket } from "socket.io-client";
import { message } from 'antd';
import { NotificationType } from "../types/notification";

const chatApi = new ChatApi();
const messageApi = new MessageApi();

type Props = {
    children: ReactNode,
    user: User | null
}


export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatContextProvider({ children, user }: Props) {
    const [ chats, setChats ] = useState<ChatType>();
    const [ isChatLoading, setIsChatLoading ] = useState<Boolean>(false);
    const [ currentChat, setCurrentChat ] = useState<ChatType>();
    const [ messages, setMessages ] = useState<MessageType[]>([]);
    const [ isMessageLoading, setIsMessageLoading ] = useState<Boolean>(false);
    const [ newMessage, setNewMessage ] = useState();
    const [ socket, setSocket ] = useState<Socket | null>(null);
    const [ isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
    const [ notifications, setNotifications ] = useState<NotificationType[]>([]);
    const [ onlineUsers, setOnlineUsers ] = useState<OnlineUsers[]>([]);
     
    useEffect(() => {
        if(user?._id) {
            setIsChatLoading(true);
            chatApi.getChats(user._id)
                .then(res => {
                    setChats(res);
                    setIsChatLoading(false);
                })
        }
        
    }, [user])

    useEffect(() => {
        if(currentChat?._id) {
            setIsMessageLoading(true);
            messageApi.getMessage(currentChat._id)
                .then(res => {
                    setMessages(res);
                    setIsMessageLoading(false);
                })
        }
        
    }, [currentChat])

    useEffect(() => {
        const newSocket = io("http://localhost:3002");
        newSocket.on('connect', () => {
            setSocket(newSocket);
            setIsSocketConnected(true);
        })
        
        return () => {
            newSocket.disconnect();
        }
    }, [user])


    useEffect(() => {
        if(socket === null) return;
        socket.emit('addUserOnline', user?._id);
        socket.on('getUserOnlines', (res) => {
            setOnlineUsers(res);
        })
    }, [socket])
    
    useEffect(() => {
        socket?.on('message', (res) => {
            if(currentChat?._id !== res.chatId) return;
            
            setMessages((prev) => [...prev, res]);
        });

        socket?.on('notification', (res) => {
            const isChatOpen = currentChat?.members.some(id => id === res.senderId);

            if(isChatOpen) {
                setNotifications((prev) => [{ ...res, isReadMessage: true }, ...prev])
            } else {
                setNotifications((prev) => [res, ...prev])
            }
            
        })

        return () => {
            socket?.off('message');
            socket?.off('notification');
        }
    }, [socket, currentChat])

    useEffect(() => {
        const recipientId = currentChat?.members.find(member => member !== user?._id);
        
        socket?.emit('message', {
            newMessage,
            recipientId
        });        
    }, [newMessage])
    
    const sendMessage = useCallback(async ({message, userId, chatId}: MessageRequest) => {
        const messageRequest: MessageRequest = {
            message: message,
            userId: userId,
            chatId: chatId
        }

        messageApi.sendMessage(messageRequest)
            .then(res => {
                setMessages((prev) => [...prev, res]);
                setNewMessage(res);
            })
    }, [])
    
    const handleSetCurrentChat = useCallback(async (chat: ChatType) => {
        setCurrentChat(chat);
    }, [currentChat, isSocketConnected])
    
    const handleClickDeleteChat = useCallback(async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, chatId: string) => {
        event.stopPropagation();
        
        chatApi.deleteChat(chatId)
            .then(res => {
                message.success(res.message);
                
                if(currentChat?._id === chatId) {
                    setCurrentChat(undefined);
                }
            })
    }, []);


    const markThisUserAsReadMessage = useCallback(({userUnread, notifications}: any) => {
        const markNotifications = notifications.map((el: any) => {
            let notification;   
            
            userUnread.forEach((n: any) => {
                if(n.senderId === el.senderId) {
                    notification = {...n, isReadMessage: true}
                } else {
                    notification = el;
                }
            });
            
            return notification;
            
        });

        console.log(markNotifications);
        
        setNotifications(markNotifications);
    }, []);
        
    return (
        <ChatContext.Provider 
            value={{
                chats, 
                messages, 
                onlineUsers,
                newMessage,
                currentChat, 
                notifications,
                isChatLoading, 
                isMessageLoading, 
                setChats,
                sendMessage,
                setCurrentChat, 
                handleSetCurrentChat,
                handleClickDeleteChat,
                markThisUserAsReadMessage
            }}>
                {children}
        </ChatContext.Provider>
    )
}