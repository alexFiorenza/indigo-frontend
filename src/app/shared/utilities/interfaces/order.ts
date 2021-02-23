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
    paymentData: PaymentData;
    createdAt: string;
    branch_office: BranchOffice;
    costToSend?: number;
    trackingDeliveryData?: Array<TrackingDeliveryData>;
}
interface PaymentData {
    payment_method: string;
    payment_type: string;
    payment_id: number;
    payment_card: Paymentcard;
    payment_installments: number;
}


interface BranchOffice {
    numero: string;
    localidad: string;
    calle: string;
    cp: number;
}
interface Paymentcard {
    id?: any;
    first_six_digits: string;
    last_four_digits: string;
    expiration_month: number;
    expiration_year: number;
    date_created: string;
    date_last_updated: string;
    cardholder: Cardholder;
}

interface Cardholder {
    name: string;
    identification: Identification;
}

interface Identification {
    number: string;
    type: string;
}

interface TrackingDeliveryData {
    numeroDeBulto: string;
    numeroDeEnvio: string;
    totalizador: string;
    linking: Linking[];
}

interface Linking {
    meta: string;
    contenido: string;
}