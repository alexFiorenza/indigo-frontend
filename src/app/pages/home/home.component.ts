import { environment } from 'src/environments/environment';
import { Slides } from './../../shared/utilities/interfaces/slides';
import { Product } from './../../shared/utilities/interfaces/product';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SlidesService } from '../../core/services/http/api/slides/slides.service';
import { ProductsService } from '../../core/services/http/api/products/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
  public products: Array<Product>;
  public homeViewProducts: Array<Product>;
  public Slides: Array<Slides>;
  public uploadsUrl = environment.uploadsUrl;
  public fullyLoaded = false;
  public shoesConfigDesktop: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 4,
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
  constructor(private slideService: SlidesService, private productsService: ProductsService) {
    this.slideService.getAllSlides().subscribe((res: any) => {
      if (res.status) {
        this.Slides = res.response
        this.productsService.getHomeViewProducts().subscribe((res: any) => {
          if (res.status) {
            this.homeViewProducts = res.response;
            this.productsService.getProducts(1, 20).subscribe((res) => {
              if (res.status) {
                this.products = res.response.products;
                this.fullyLoaded = true;
              }
            })
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }
  ngAfterContentInit() {
    console.log('loaded');
  }
}
