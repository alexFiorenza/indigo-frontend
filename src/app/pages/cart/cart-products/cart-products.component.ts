import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { CartService } from './../../../core/services/cart/cart.service';
import { Order } from './../../../shared/utilities/interfaces/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }
  deleteProduct(index: number) {
    this.cartService.deleteOneProduct(index);
  }
}
