import { apiInstance } from "./api";

interface User{
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    dateBirth: Date
}
export async function signin(user:User) {
    try {
        const res = await apiInstance.post("signin", user);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}