import { apiInstance } from "./api";

export async function getPaymentUrl() {
    try {
        const respone:{payment_url:string} = await apiInstance.post('/create_payment_url', {amount: 100000, orderId: "123",orderDescription: "what", orderType: "other",language: "vn" });
    
        return respone.payment_url;
    } catch (error) {
        throw error;
    }
}