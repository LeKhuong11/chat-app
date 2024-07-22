
export type MessageType = {
    _id: string,
    chatId: string,
    senderId: string,
    content: string,
    createdAt: string,
    updatedAt: string
}

export type MessageRequest = {
    message: string,
    userId: string,
    chatId: string
}