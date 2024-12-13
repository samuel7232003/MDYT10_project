export interface User{
    _id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    listSeat: string[];
}

export interface UserModel{
    user: User;
}