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
    
  const userId = chat.members.find(member => member !== user._id) || '';
  
    useEffect(() => {
        const getUser = async () => {
            const response = await userApi.getUserById(userId);
            setPartner(response.user);
        }
        
        getUser();
    }, [])

    
    return { partner };
}