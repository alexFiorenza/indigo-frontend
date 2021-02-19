import { Order } from './order';
export interface User {
    name: string;
    email: string;
    role: string;
    province: string;
    town: string;
    cp: number;
    _id?: number;
    phone: number;
    street: string;
    numberStreet: number;
    floor?: string;
    department?: string;
    date?: string;
    favorites: Array<Order>;
    docNumber?: number;
    docType?: string
};