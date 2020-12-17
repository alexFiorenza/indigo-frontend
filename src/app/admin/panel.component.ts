import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { Product } from '../shared/utilities/interfaces/product';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterContentInit {
  public previousDiv: HTMLElement;
  public actualRoute;
  public hasToShowAlert = false;
  public actualProduct: Product;
  public selectedColor;
  public selectedSize;
  public sizes = [];
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
  }
  ngAfterContentInit() {
    this.actualRoute = this.activatedRoute.snapshot.firstChild.routeConfig.path
    switch (this.actualRoute) {
      case 'productos':
        this.previousDiv = document.querySelector('#productsTransition');
        this.previousDiv.classList.toggle('hidden');
        break;
      case 'ordenes':
        this.previousDiv = document.querySelector('#ordersTransition')
        this.previousDiv.classList.toggle('hidden');
        break;
      default:
        this.previousDiv = document.querySelector('#homeTransition')
        this.previousDiv.classList.toggle('hidden');
        break;
    }
  }
  transitionRouter(div: HTMLElement) {
    if (!this.previousDiv) {
      this.previousDiv = div;
    } else {
      this.previousDiv.classList.add('hidden');
    }
    div.classList.toggle('hidden');
    this.previousDiv = div;
  }
  componentInitialized(component: ProductsComponent) {
    if (component.emitAlert) {
      component.emitAlert.subscribe((value) => {
        if (value.showAlert) {
          this.hasToShowAlert = value.showAlert;
          this.actualProduct = value.product;
        } else {
          this.hasToShowAlert = value;
        }

      })
    }
  }
  selectSize(event) {

  }
  colorSelected($event, colorSelected) {

  }
}
