export interface Bill{
    _id: string;
    idBill: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    numSeat: number;
}

export interface BillModel{
    bill: Bill;
    listBill: Bill[];
}