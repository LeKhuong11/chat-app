import { createContext, ReactNode, useEffect, useState } from "react";
import { ChatContextType } from "../types/chat";
import ChatApi from "../apis/Chat";
import { User } from "../types/user";

const chatApi = new ChatApi();
type Props = {
    children: ReactNode,
    user: User | null
}


export const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function ChatContextProvider({ children, user }: Props) {
    const [ chats, setChats ] = useState<ChatContextType>();
    const [ isChatLoading, setIsChatLoading ] = useState<Boolean>(false);
                                                    
    useEffect(() => {
        if(user?._id) {
            setIsChatLoading(true);
            chatApi.getChats(user._id)
            .then(res => {
                setChats(res);
                setIsChatLoading(false);
            })
        }
        
    }, [])

    return (
        <ChatContext.Provider value={{chats, isChatLoading}}>
            {children}
        </ChatContext.Provider>
    )
}