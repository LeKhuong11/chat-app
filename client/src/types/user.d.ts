

export type UserLogin = {
    email: string,
    password: string
}

export type UserRegister = {
    name: string,
    email: string,
    password: string
}

export type UserProfile = {
    name: string;
    email: string;
};

export type UserContextType = {
    user: User,
    token: string,
    isLoggedIn: boolean,
    updateUserLogin: any
}

export type OnlineUsers = {
    userId: string,
    socketId: string
}

export type User = {
    _id: string,
    name: string,
    email: string,
}
