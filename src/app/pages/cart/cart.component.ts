import { ShippingService } from './../../core/services/http/andreani/shipping.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserService } from './../../core/services/http/api/user/user.service';
import { Order } from './../../shared/utilities/interfaces/order';
import { environment } from './../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { products } from '../../shared/utilities/mocks/product';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { User } from '../../shared/utilities/interfaces/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  private production = environment.production;
  public productsPrice: number = 0;
  public costSend: number = 0;
  public total: number = 0;
  public title: string;
  public user: User;
  constructor(
    private cartService: CartService,
    @Inject(DOCUMENT) private document,
    private r: Renderer2,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private andreaniService: ShippingService
  ) { }

  ngOnInit(): void {
    this.r.setStyle(document.body, 'background-color', '#f3f3f3');
    this.calculateCostProduct();
    this.activatedRoute.children.forEach((r: any) => {
      this.title = r.url.value[0].path;
    });
    this.router.events.subscribe((val: any) => {
      if (val.url === '/carrito/datos') {
        this.title = '¿Estos datos son correctos?';
      } else {
        this.title = 'productos';
      }
    });
    this.user = this.userService.loadPayload();
    if (this.user && this.products.length > 0) {
      this.calculateSendCost();
    }
  }
  calculateCostProduct() {
    this.productsPrice = 0;
    this.products = this.cartService.getProducts();
    this.products.forEach((p) => {
      this.productsPrice += p.price;
    });
    this.total = this.productsPrice + this.costSend;
    console.log(this.total);
  }
  calculateSendCost() {
    this.andreaniService.getCredentials().subscribe((credentials: any) => {
      this.andreaniService.credentials = credentials.response;
      this.andreaniService.costShipping(this.user.cp, this.products, 'BAR').subscribe((val) => {
        this.costSend = parseInt(val.response.tarifaConIva.total);
      })
    })
  }
  checkout() {
    this.router.navigateByUrl('procesar_pago', {
      state: {
        price: this.total
      }
    });
  }
  componentActivated(event: CartProductsComponent) {
    if (event.productDeleted) {
      event.productDeleted.subscribe(value => {
        this.calculateCostProduct();
      });
    }
  }
}
