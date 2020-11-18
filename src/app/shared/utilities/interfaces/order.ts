export interface Order {
    name: string;
    description: string;
    sizes: string;
    price: number;
    color: string;
    image: Array<any>;
    weight?: number;
    top?: boolean;
    sale?: number;
    homeView: boolean;
    _id?: string;
    categories: Array<any>;
    stock: boolean;
}