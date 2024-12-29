export interface Seat{
    idTicket: string;
    name: string;
    status: "NONE" | "DONE" | "PENDING";
}

export interface SeatModel{
    seat: Seat;
    listSeat: Seat[];
}

export interface Ticket{
    idTicket: string;
    name: string;
    phone: string;
    seat: string;
    code: string;
}