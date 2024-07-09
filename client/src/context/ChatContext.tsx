import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { ChatContextType, ChatType } from "../types/chat";
import ChatApi from "../apis/Chat";
import { User } from "../types/user";
import MessageApi from "../apis/Message";
import { MessageRequest, MessageType } from "../types/message";

const chatApi = new ChatApi();
const messageApi = new MessageApi();

type Props = {
    children: ReactNode,
    user: User | null
}


export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatContextProvider({ children, user }: Props) {
    const [ chats, setChats ] = useState<ChatContextType>();
    const [ isChatLoading, setIsChatLoading ] = useState<Boolean>(false);
    const [ currentChat, setCurrentChat ] = useState<ChatType>();
    const [ messages, setMessages ] = useState<MessageType[]>([]);
    const [ isMessageLoading, setIsMessageLoading ] = useState<Boolean>(false);
                                                    
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
    
    const sendMessage = useCallback(async ({message, userId, chatId}: MessageRequest) => {
        const messageRequest: MessageRequest = {
            message: message,
            userId: userId,
            chatId: chatId
        }

        messageApi.sendMessage(messageRequest)
            .then(res => {
                setMessages((prev) => [...prev, res])
            })
    }, [])
    

    return (
        <ChatContext.Provider value={{chats, isChatLoading, currentChat, setCurrentChat, messages, isMessageLoading, sendMessage}}>
            {children}
        </ChatContext.Provider>
    )
}