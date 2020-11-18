import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "./../../core/services/http/api/user/user.service";
import { Order } from "./../../shared/utilities/interfaces/order";
import { environment } from "./../../../environments/environment";
import { DOCUMENT } from "@angular/common";
import { Product } from "./../../shared/utilities/interfaces/product";
import { CartService } from "./../../core/services/cart/cart.service";
import { Component, Inject, OnInit, Renderer2 } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  private production = environment.production;
  public productsPrice: number = 0;
  public costSend: number = 0;
  public total: number = 0;
  public title: string;
  public user;
  constructor(
    private cartService: CartService,
    @Inject(DOCUMENT) private document,
    private r: Renderer2,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.r.setStyle(document.body, "background-color", "#f3f3f3");
    this.products = this.cartService.getProducts();
    this.calculateCostProduct();

    this.activatedRoute.children.forEach((r: any) => {
      this.title = r.url.value[0].path;
    })
    this.user = this.userService.loadPayload();
  }
  calculateCostProduct() {
    this.products.forEach((p) => {
      this.productsPrice += p.price;
    });
    this.total += this.productsPrice + this.costSend;
  }
  calculateSendCost() { }
}
