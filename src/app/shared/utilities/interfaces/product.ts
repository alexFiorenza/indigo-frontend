export interface Product {
    name: string;
    description: string;
    sizes: Array<any>;
    price: number;
    color: Array<any>;
    images: Array<any>;
    weight?: number;
    top?: boolean;
    sale?: number;
    homeView: boolean;
    _id?: string;
    categories: Array<any>;
    stock: boolean;
}