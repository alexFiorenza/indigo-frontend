import { UserService } from './../../core/services/http/api/user/user.service';
import { Order } from './../../shared/utilities/interfaces/order';
import { environment } from './../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Product } from './../../shared/utilities/interfaces/product';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  private production = environment.production;
  public user;
  constructor(private cartService: CartService, @Inject(DOCUMENT) private document, private r: Renderer2,
    private userService: UserService) { }

  ngOnInit(): void {
    this.r.setStyle(document.body, 'background-color', '#f3f3f3');
    // this.products = this.cartService.getProducts();
    this.products = [{
      categories: ['hombre', 'zapatilla'],
      color: '#f9e79f',
      description: 'Zapatillas con cordones',
      homeView: false,
      // tslint:disable-next-line: max-line-length
      image: ['sampleShoe3-5fa8aa0398619f8e60d154e5.png', 'sampleShoe1-5fa8aa0398619f8e60d154e5.png', 'sampleShoe2-5fa8aa0398619f8e60d154e5.png'],
      name: 'Zapatillas 3',
      price: 450,
      sale: 0,
      sizes: '42',
      stock: true,
      top: false,

      _id: '5fa8aa0398619f8e60d154e5'
    }]
    this.user = this.userService.loadPayload();
  }
  calculateCost() {

  }
}
