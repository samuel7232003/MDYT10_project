import { apiInstance } from "./api";

export async function sendEmail(emailData: {email:string, subject:string, content:string}) {
    try {
        const respone = await apiInstance.post('/sendemail', emailData);
        return respone;
    } catch (error) {
        throw(error)
    }
}