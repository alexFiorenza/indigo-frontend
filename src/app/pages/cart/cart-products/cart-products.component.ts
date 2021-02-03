import { ShippingService } from './../../../core/services/http/andreani/shipping.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { CartService } from './../../../core/services/cart/cart.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../shared/utilities/interfaces/order';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  public productsInFavorites: Array<Order> = [];
  @Output() productDeleted = new EventEmitter<any>();
  constructor(private cartService: CartService, private router: Router, private andreaniService: ShippingService, private cartComponent: CartComponent) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }
  deleteProduct(index: number) {
    this.cartService.deleteOneProduct(index);
    this.productDeleted.emit(this.cartService.getProducts());
    this.recalculateCostProduct();
  }
  redirectToProduct(product) {
    const idProduct = product._id;
    this.router.navigate(['/productos', idProduct]);
  }
  recalculateCostProduct() {
    this.andreaniService.getCredentials().subscribe((credentials: any) => {
      this.andreaniService.credentials = credentials.response;
      this.andreaniService.costShipping(this.cartComponent.user.cp, this.products, 'BAR').subscribe((val) => {
        this.cartComponent.costSend = parseInt(val.response.tarifaConIva.total);
        this.cartComponent.total += this.cartComponent.costSend;
      })
    })
  }
}
