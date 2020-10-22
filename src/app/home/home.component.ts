import { slides } from './../utilities/mocks/slides';
import { Slides } from './../utilities/interfaces/slides';
import { products } from './../utilities/mocks/product';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Product } from '../utilities/interfaces/product';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  public products: Array<Product>;
  public Slides: Array<Slides>;
  public config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: true,
    autoplay: true
  };
  constructor() {
    this.Slides = slides;
    console.log(this.Slides);
    this.products = products.array;
  }

  ngOnInit(): void {
  }
  ngAfterContentInit() {
    console.log('loaded');
  }
}
