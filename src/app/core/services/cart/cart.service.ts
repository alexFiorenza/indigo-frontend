import { Order } from './../../../shared/utilities/interfaces/order';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any>([]);
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
  }

}
