import { Slides } from './../../shared/utilities/interfaces/slides';
import { products } from './../../shared/utilities/mocks/product';
import { Product } from './../../shared/utilities/interfaces/product';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { slides } from 'src/app/shared/utilities/mocks/slides';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  public products: Array<Product>;
  public Slides: Array<Slides>;
  public shoesConfigDesktop: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 5,
    navigation: true
  };
  public shoesConfigMobile: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    navigation: true
  };
  public homeConfigSlider: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: true
  };
  constructor() {
    this.Slides = slides;
    this.products = products.array;
  }

  ngOnInit(): void {
  }
  ngAfterContentInit() {
    console.log('loaded');
  }
}