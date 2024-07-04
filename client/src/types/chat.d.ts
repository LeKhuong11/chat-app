

export type ChatType = {
    _id: String,
    members: String[],
    createdAt: String,
    updatedAt: String,
}

export type ChatContextType = {
    chats: Array,
    isChatLoading: Boolean
}