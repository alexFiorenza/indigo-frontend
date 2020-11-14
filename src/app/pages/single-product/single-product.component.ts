import { Order } from './../../shared/utilities/interfaces/order';
import { CartService } from './../../core/services/cart/cart.service';
import { DOCUMENT } from '@angular/common';
import { SwiperOptions } from 'swiper';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../core/services/http/api/products/products.service';
import { Component, Inject, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/utilities/interfaces/product';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  public productId: string;
  public product: Order;
  public apiUrl: string;
  public production = environment.production;
  public currentImage;
  public selectedColor: string;
  public selectedSize: string;
  public lastSelectedColor;
  public lastSelectedSize;
  private zoomMade = false;
  @ViewChild('alert') private alert: ElementRef;
  public config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    @Inject(DOCUMENT) private _document,
    private r: Renderer2,
    private cartService: CartService,
    private clipboardService: ClipboardService
  ) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.getSingleProduct(params.id).subscribe((resp: any) => {
        this.product = resp.response;
        if (!this.production) {
          this.apiUrl = `${environment.uploadsUrl}/`;
        } else {
          //do staff with gcp service
        }
        this.currentImage = `${this.apiUrl}${this.product.image[0]}`;
      });
    });
  }
  ngOnInit(): void {

  }
  changeCurrentImage(index: number) {
    this.currentImage = `${this.apiUrl}${this.product.image[index]}`;
  }
  addToCart() {
    const productToAdd = { ...this.product };
    Object.assign(productToAdd, {
      color: this.selectedColor,
      sizes: this.selectedSize,
    });
    this.cartService.addNewProduct(productToAdd);
    this.showAlert();
  }
  selectColor(event) {
    if (this.lastSelectedColor) {
      this.lastSelectedColor.classList.add('hidden');
    }
    const containerColor = event.currentTarget;
    this.lastSelectedColor = event.currentTarget.firstElementChild;
    this.lastSelectedColor.classList.remove('hidden');
    const hex = this.getRGBValues(containerColor.style.backgroundColor);
    const red = hex[0];
    const green = hex[1];
    const blue = hex[2];
    this.selectedColor = this.rgbToHex(red, green, blue);
  }
  selectSize(event) {
    if (this.lastSelectedSize) {
      this.lastSelectedSize.classList.remove('selectedSize');
    }
    this.lastSelectedSize = event.currentTarget;

    this.lastSelectedSize.classList.add('selectedSize');
    const size = this.lastSelectedSize.textContent;
    this.selectedSize = size;
  }
  rgbToHex(r, g, b) {
    // tslint:disable-next-line: no-bitwise
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  getRGBValues(str) {
    const sep = str.indexOf(',') > -1 ? ',' : ' ';
    return str.substr(4).split(')')[0].split(sep).map(Number);
  }
  showAlert() {

    this.alert.nativeElement.classList.remove('hidden');
    this.alert.nativeElement.classList.add('flex');
    setTimeout(() => {
      this.alert.nativeElement.classList.add('hidden');
      this.alert.nativeElement.classList.remove('flex');
    }, 3500);
  }
  share() {
    const url = window.location.href
    this.clipboardService.copy(url);
  }
}
