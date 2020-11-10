import { DOCUMENT } from '@angular/common';
import { SwiperOptions } from 'swiper';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../core/services/http/api/products/products.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/utilities/interfaces/product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  public productId: string;
  public product: Product;
  public apiUrl: string;
  public production = environment.production;
  public config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: true
  }
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService,
    @Inject(DOCUMENT) private _document, private r: Renderer2) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.getSingleProduct(params.id).subscribe((resp: any) => {
        this.product = resp.response;
        if (!this.production) {
          this.apiUrl = `${environment.uploadsUrl}/`;
        } else {
          //do staff with gcp service
        }
      })
    });
  }
  ngOnInit(): void {
  }
}
