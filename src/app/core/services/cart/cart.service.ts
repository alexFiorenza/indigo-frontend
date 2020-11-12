import { Product } from 'src/app/shared/utilities/interfaces/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  private products: Array<Product> = [];
  public $cart = this.cart.asObservable();
  constructor() {

  }
  addNewProduct(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
  getProducts(): Array<Product> {
    return this.cart.getValue();
  }
}
