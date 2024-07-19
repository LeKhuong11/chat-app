import { useEffect, useState } from "react"
import { ChatType } from "../types/chat"
import { User } from "../types/user"
import UserApi from "../apis/User"

const userApi = new UserApi();

type useFetchPartnerType = {
    chat: ChatType,
    user: User
}

export function useFetchPartner({ chat, user }: useFetchPartnerType) {
    const [partner, setPartner] = useState<User | undefined>(undefined);
    
    const recipientId = chat?.members.find(member => member !== user._id) || '';
    
    useEffect(() => {
        const getUser = async () => {
            if(!recipientId) return null;
            
            await userApi.getUserById(recipientId)
                .then(res => {
                    setPartner(res.user)
                });
            
        }
        
        getUser();
    }, [chat])

    
    return { partner };
}