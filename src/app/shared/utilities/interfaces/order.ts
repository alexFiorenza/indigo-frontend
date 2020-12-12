import { User } from './user';
export interface Order {
    name: string;
    description: string;
    sizes: string;
    price: number;
    color: string;
    images: Array<any>;
    weight?: number;
    top?: boolean;
    sale?: number;
    homeView: boolean;
    _id?: string;
    products: Array<any>;
    status: string;
    categories: Array<any>;
    stock: boolean;
    deliveryMethod?: string;
    user?: User;
    delayTime?: string;
    trackingId?: string;
}