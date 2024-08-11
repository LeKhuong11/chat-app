import { MessageType } from "./message";
import { NotificationType } from "./notification";
import { OnlineUsers } from "./user";


export type ChatType = {
    _id: string,
    members: string[],
    createdAt?: string,
    updatedAt?: string,
}

export type ChatRequest = {
    firstId: string,
    secondId: string
}

type userChat = {
    chat: ChatType,
    user: User
  }

export type ChatContextType = {
    chats: Array,
    setChats: Dispatch<SetStateAction<ChatType[] | undefined[]>>,
    isChatLoading: Boolean,
    currentChat: SetStateAction<ChatType | undefined>,
    setCurrentChat: Dispatch<SetStateAction<ChatType | undefined>>;
    isMessageLoading: Boolean,
    messages: MessageType[],
    newMessage: MessageType | undefined,
    notifications: NotificationType[],
    onlineUsers: OnlineUsers[],
    sendMessage: ({ message, userId, chatId }: MessageRequest)  => Promise<void>,
    handleSetCurrentChat: (item: ChatType) => Promise<void>,
    handleClickDeleteChat: (evnet: React.MouseEvent<HTMLDivElement, MouseEvent>, chatId: string) => Promise<void>,
    markThisUserAsReadMessage: ({ thisUserNotification, notification }: any)  => void,
}