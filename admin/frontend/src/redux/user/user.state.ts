export interface User{
    _id: string;
    username: string;
    role: string;
}

export interface UserModel{
    user: User;
}