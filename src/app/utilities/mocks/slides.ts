import { Slides } from './../interfaces/slides';
const slide1: Slides = {
    title: 'Nuestras ofertas',
    // tslint:disable-next-line: max-line-length
    description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore corporis repellendus qui esse dolorem placeat evenie. ',
    button: 'Conocer',
    image: '../../assets/sampleBg.png',
    color: '#FBB6DB',
    wordsColor: '#ffff'
};
const slide2: Slides = {
    title: 'Zapatos de hombre',
    // tslint:disable-next-line: max-line-length
    description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore corporis repellendus qui esse dolorem placeat evenie. ',
    button: 'Probar',
    image: '../../assets/sampleBg.png',
    color: '#2DC3F7',
    wordsColor: '#ffff'
};
const slide3: Slides = {
    title: 'Zapatos de mujer',
    // tslint:disable-next-line: max-line-length
    description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore corporis repellendus qui esse dolorem placeat evenie. ',
    button: 'Probar',
    image: '../../assets/sampleBg.png',
    color: '#F72D86',
    wordsColor: '#ffff'
};

export const slides = [
    slide1,
    slide2,
    slide3
]