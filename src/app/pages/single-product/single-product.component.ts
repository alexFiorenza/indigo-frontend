import { DOCUMENT } from '@angular/common';
import { Order } from './../../shared/utilities/interfaces/order';
import { CartService } from './../../core/services/cart/cart.service';
import { SwiperOptions } from 'swiper';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../core/services/http/api/products/products.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { UserService } from '../../core/services/http/api/user/user.service';
import { User } from '../../shared/utilities/interfaces/user';

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
  public sizes = [];
  public lastSelectedColor;
  public lastSelectedSize;
  public favorites = [];
  public userSession: User;
  public productInFavorites;
  @ViewChild('alert') private alert: ElementRef;
  @ViewChild('addCart') private cartBtn: ElementRef;
  @ViewChild('favorite') private favorite: ElementRef;
  public config: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private clipboardService: ClipboardService,
    private userService: UserService,
    private r: Renderer2
  ) {
    this.r.setStyle(document.body, 'background-color', 'white');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.getSingleProduct(params.id).subscribe((resp: any) => {
        this.product = resp.response;
        if (!this.production) {
          this.apiUrl = `${environment.uploadsUrl}/`;
        } else {
          //do staff with gcp service
        }
        this.currentImage = `${this.apiUrl}${this.product.images[0].image}`;
      });
    });
  }
  ngOnInit(): void {
    this.userSession = this.userService.loadPayload();
    if (this.userSession) {
      this.userService.getFavorites().subscribe((res) => {
        //Add loader 
        this.favorites = res.response.favorites;
        if (this.favorites.length > 0) {
          this.favorites.forEach(p => {
            p.product._id === this.product._id ? this.productInFavorites = true : this.productInFavorites = false;
          });
          if (this.productInFavorites && this.favorite) {
            this.favorite.nativeElement.classList.add('-active');
          }
        }
      });
    }
  }

  addToFavorites() {
    const favoriteElement = this.favorite.nativeElement;
    if (favoriteElement.className.indexOf('-active') > -1) {
      favoriteElement.classList.remove('-active');
      if (this.productInFavorites) {
        this.userService.deleteFavorite(this.product).subscribe(res => {
          console.log(res);
        });
      }
    } else {
      favoriteElement.classList.add('-active');
      if (!this.productInFavorites) {
        this.userService.addToFavorites(this.product).subscribe((res) => {
          this.productInFavorites = true;
        });
      };
    }
  }
  changeCurrentImage(index: number) {
    this.currentImage = `${this.apiUrl}${this.product.images[index].image}`;
  }
  addToCart() {
    if (this.cartBtn.nativeElement.classList.contains('added')) {
      this.cartBtn.nativeElement.classList.toggle('added');
      return;
    } else {
      this.cartBtn.nativeElement.classList.toggle('added');
    }
    setTimeout(() => {
      const productToAdd = { ...this.product };
      Object.assign(productToAdd, {
        color: this.selectedColor,
        sizes: this.selectedSize,
      });
      this.cartService.addNewProduct(productToAdd);
      this.showAlert();
    }, 2000);

  }
  selectColor(event, color) {
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
    this.sizes = color.sizes;
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
    window.scrollTo(0, 0);
    this.alert.nativeElement.classList.remove('hidden');
    this.alert.nativeElement.classList.add('flex');
    setTimeout(() => {
      this.alert.nativeElement.classList.add('hidden');
      this.alert.nativeElement.classList.remove('flex');
    }, 3500);
  }
  share() {
    const url = window.location.href;
    this.clipboardService.copy(url);
  }
  async shareMobile() {
    const sharableData = {
      title: `Indigo: ${this.product.name}`,
      text: `${this.product.description}`,
      url: window.location.href
    };
    try {
      await (navigator as any).share(sharableData);
    } catch (error) {
      console.error(error);
    }
  }
}
