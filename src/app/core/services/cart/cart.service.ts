import { Order } from './../../../shared/utilities/interfaces/order';
import { Product } from 'src/app/shared/utilities/interfaces/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Order[]>([]);
  private products: Array<Order> = [];
  public $cart = this.cart.asObservable();
  constructor() {

  }
  addNewProduct(product: Order) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
  getProducts(): Array<Order> {
    return this.cart.getValue();
  }
  deleteOneProduct(index: number) {
    this.cart.getValue().splice(index, 1);
    this.cart.next(this.cart.getValue());
  }
}
