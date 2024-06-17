

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
    user: UserProfile | null,
    token: string,
    isLoggedIn: boolean
}
