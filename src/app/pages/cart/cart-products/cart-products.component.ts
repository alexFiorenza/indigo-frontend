import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { CartService } from './../../../core/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/utilities/interfaces/order';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  public productsInFavorites: Array<Order> = [];
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }
  deleteProduct(index: number) {
    this.cartService.deleteOneProduct(index);
  }
  redirectToProduct(product) {
    const idProduct = product._id;
    this.router.navigate(['/productos', idProduct]);
  }
}
