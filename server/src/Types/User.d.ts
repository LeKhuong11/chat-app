
export type User = {
    name: string, 
    email: string, 
    password: string
}

export type UserLogin = {
    email: string, 
    password: string
}

export type OnlineUsers = {
    userId: string,
    socketId: string
}