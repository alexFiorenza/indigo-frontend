export interface Product {
    name: string;
    description: string;
    price: number;
    color: Array<Color>;
    images: Array<Image>;
    weight?: number;
    top?: boolean;
    sale?: number;
    homeView: boolean;
    _id?: string;
    categories?: Array<Category>;
    stock: boolean;
    packageWeight: PackageWeight;
    sizes?: string;
}
export interface Category {
    subcategories: Subcategory[];
    _id: string;
    name: string;
}

export interface Subcategory {
    name: string;
}
export interface Color {
    color: string;
    available: boolean;
    sizes: Size[];
}

export interface Size {
    size: string;
    available: boolean;
}
export interface Image {
    uid: string;
    image: string;
}
interface PackageWeight {
    width: number;
    length: number;
    height: number;
    weight: number;
    volume: number;
}