import { Image } from './product';
export interface Slides {
    title: string;
    images: Array<Image>;
    description?: string;
    button?: string;
    color?: string;
    btnDirection?: string;
    wordsColor?: string;
};
