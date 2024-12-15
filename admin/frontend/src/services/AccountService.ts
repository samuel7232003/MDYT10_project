import { apiInstance } from "./api";

export async function login(username: string, password: string):Promise<any> {
    try{
        const data = {
            username: username,
            password: password
        };
        const respone = await apiInstance.post("/login", data);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function getProfileService(username:string) :Promise<any>{
    try{
        const res = await apiInstance.get(`/profile?username=${username}`);
        console.log(res);
        return res;
    } catch(error){
        throw(error);
    }
}

export async function signin(username:string, password:string, role:string) {
    try{
        const res = await apiInstance.post("/signup", {username: username, password: password, role: role});
        return res;
    } catch(error){
        console.log(error);
    }
}

export async function setActivity(username: string, type: string, idBill: string) {
    try {
        const res = await apiInstance.post("/setActivity", {username: username, type: type, idBill: idBill});
        return res;
    } catch (error) {
        console.log(error);
    }
}