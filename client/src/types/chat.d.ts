import { MessageType } from "./message";


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

export type ChatContextType = {
    chats: Array,
    setChats: Dispatch<SetStateAction<ChatType[] | undefined[]>>,
    isChatLoading: Boolean,
    currentChat: SetStateAction<ChatType | undefined>,
    setCurrentChat: Dispatch<SetStateAction<ChatType | undefined>>;
    isMessageLoading: Boolean,
    messages: MessageType[],
    sendMessage: ({ message, userId, chatId }: MessageRequest)  => Promise<void>,
    handleSetCurrentChat: (item: ChatType) => Promise<void>
}