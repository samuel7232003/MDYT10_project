export interface User{
    _id: string;
    name: string;
    phone: string;
    email: string;
    listSeat: string[];
}

export interface UserModel{
    user: User;
}