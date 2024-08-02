import { useContext, useEffect, useState } from "react";
import { MessageType } from "../types/message";
import MessageApi from "../apis/Message";
import { ChatContext } from "../context/ChatContext";

const messageApi = new MessageApi();

export function useFetchLatestMessage(chatId: string) {
    const [latestMessage, setLatestMessage] = useState<MessageType>();
    const { newMessage, notifications } = useContext(ChatContext);

    useEffect(() => {
        const getLatestMessage = async () => {
            
            await messageApi.getLatestMessage(chatId)
                .then(res => {
                    setLatestMessage(res)
                });
        }
        
        getLatestMessage();
    }, [newMessage, notifications])

    
    return { latestMessage };
}