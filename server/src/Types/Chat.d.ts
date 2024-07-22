
export type Chat = {
    _id: String,
    members: String[],
    createdAt: String,
    updatedAt: String
}

export type ChatParams = {
    firstId: String,
    secondId: String
}