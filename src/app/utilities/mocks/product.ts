import { Product } from '../interfaces/product';

const product1 = {
    _id: '5f879e903f2b83266fe0899d',
    categories: [
        'hombre',
        'zapatilla'
    ],
    sizes: [
        {
            size: 44,
            available: false
        }
    ],
    color: [
        {
            color: 'rojo',
            available: false
        },
        {
            color: 'verde',
            available: true
        }
    ],
    image: [
        '../../assets/sampleShoe1.png'
    ],
    name: 'Zapatillas 1',
    description: 'Zapatillas con cordones',
    price: 450,
    homeView: true,
    stock: false,
    sale: 20
}
const product2 = {
    _id: '5f879e903f2b83266fe0899d',
    categories: [
        'hombre',
        'zapatilla'
    ],
    sizes: [
        {
            size: 44,
            available: false
        }
    ],
    color: [
        {
            color: 'rojo',
            available: false
        },
        {
            color: 'verde',
            available: true
        }
    ],
    image: [
        '../../assets/sampleShoe2.png'
    ],
    name: 'Zapatillas 2',
    description: 'Zapatillas con cordones',
    price: 450,
    homeView: true,
    stock: true,
    sale: 0

};
const product3 = {
    _id: '5f879e903f2b83266fe0899d',
    categories: [
        'hombre',
        'zapatilla'
    ],
    sizes: [
        {
            size: 44,
            available: false
        }
    ],
    color: [
        {
            color: 'rojo',
            available: false
        },
        {
            color: 'verde',
            available: true
        }
    ],
    image: [
        '../../assets/sampleShoe3.png'
    ],
    name: 'Zapatillas 3',
    description: 'Zapatillas con cordones',
    price: 450,
    homeView: true,
    stock: true,
    sale: 10

};
const product4 = {
    _id: '5f879e903f2b83266fe0899d',
    categories: [
        'hombre',
        'zapatilla'
    ],
    sizes: [
        {
            size: 44,
            available: false
        }
    ],
    color: [
        {
            color: 'rojo',
            available: false
        },
        {
            color: 'verde',
            available: true
        }
    ],
    image: [
        '../../assets/sampleShoe4.png'
    ],
    name: 'Zapatillas 4',
    description: 'Zapatillas con cordones',
    price: 450,
    homeView: true,
    stock: true,
    sale: 20
};
export const products = {
    array: [product1,
        product2,
        product3,
        product4
    ]
};