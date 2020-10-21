import { products } from './../utilities/mocks/product';
import { Component, OnInit } from '@angular/core';
import { Product } from '../utilities/interfaces/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Array<Product>;
  constructor() {
    this.products = products.array;
    console.log(this.products);
  }

  ngOnInit(): void {
  }

}
