import { User } from './user';
import { Product } from './product';
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
    products: Array<Product>;
    status: string;
    categories: Array<any>;
    stock: boolean;
    deliveryMethod?: string;
    user?: User;
    delayTime?: string;
    trackingId?: string;
    paymentMethod: PaymentMethod;
    createdAt: string;
    branch_office: BranchOffice;
    costToSend?: number;
}
interface PaymentMethod {
    payment_method: string;
    payment_type: string;
}


interface BranchOffice {
    numero: string;
    localidad: string;
    calle: string;
    cp: number;
}

