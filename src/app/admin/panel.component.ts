import { SalesPipe } from './../shared/pipes/sales.pipe';
import { Component, OnInit, AfterContentInit, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { Product } from '../shared/utilities/interfaces/product';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterContentInit {
  productPrice: number;
  public previousDiv: HTMLElement;
  public actualRoute;
  public hasToShowProduct = false;
  public currentProduct: Product;
  public hasToCreateProduct = false;
  constructor(private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) document, private r: Renderer2,
    private salesPipe: SalesPipe,
  ) {
  }
  ngOnInit(): void {
    this.r.setStyle(document.body, 'overflow-x', 'hidden');
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
          this.hasToShowProduct = value.showAlert;
          console.log(this.hasToShowProduct);
          this.currentProduct = value.product;
          this.productPrice = this.currentProduct.price;
          if (this.currentProduct.sale > 0) {
            this.productPrice = this.salesPipe.transform(this.currentProduct.price, this.currentProduct.sale)
            this.productPrice = Math.ceil(this.productPrice);
          }
        }
      })
    }
    if (component.createProductAlert) {
      component.createProductAlert.subscribe((value) => {
        if (value.showAlert) {
          this.hasToCreateProduct = true;
          this.hasToShowProduct = value.showAlert;
        } else {
          this.hasToShowProduct = value;
        }
      })
    }
  }
}