import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { ChatContextType, ChatType } from "../types/chat";
import ChatApi from "../apis/Chat";
import { User } from "../types/user";
import MessageApi from "../apis/Message";
import { MessageRequest, MessageType } from "../types/message";
import { io, Socket } from "socket.io-client";

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
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
                                                    
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
        socket?.on('message', (res) => {
            // console.log('this line is running');
            
            if(currentChat?._id !== res.newMessage.chatId) return;
            
            setMessages((prev) => [...prev, res.newMessage])
            
        });

        return () => {
            socket?.off('message')
        }
    }, [currentChat])

    useEffect(() => {
        // const recipientId = currentChat?.members.find(id => id !== user?._id);

        socket?.emit('message', {
            room: currentChat?._id,
            newMessage
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
        console.log(chat);
        
        setCurrentChat(chat);
        socket?.emit('joinRoom', chat._id);
    }, [currentChat, isSocketConnected])
    

    return (
        <ChatContext.Provider 
        value={{
            chats, 
            setChats,
            isChatLoading, 
            currentChat, 
            setCurrentChat, 
            messages, 
            isMessageLoading, 
            sendMessage,
            handleSetCurrentChat
        }}>
            {children}
        </ChatContext.Provider>
    )
}