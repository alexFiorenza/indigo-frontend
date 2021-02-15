import { ConfirmationService } from 'primeng/api';
import { delay } from 'rxjs/operators';
import { ShippingService } from './../../core/services/http/andreani/shipping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../core/services/http/api/user/user.service';
import { Order } from './../../shared/utilities/interfaces/order';
import { environment } from './../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, Inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { User } from '../../shared/utilities/interfaces/user';
import { SalesPipe } from '../../shared/pipes/sales.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public products: Array<Order>;
  public uploadsUrl = `${environment.uploadsUrl}/`;
  public loadingCostToSend = false;
  public productsPrice: number = 0;
  public costSend: number = 0;
  public total: number = 0;
  public costToSendCalculated = false;
  public title: string;
  public user: User;
  public displayShowBranchOffice = false;
  public displayShipping = false;
  public displayCostToSend = false;
  public selected_branch_office;
  public selected_type_shipping;
  public branch_tandil = {
    numero: '1832',
    localidad: 'Tandil',
    calle: 'San Nicolas'
  }
  public branch_pergamino = {
    numero: '1832',
    localidad: 'Pergamino',
    calle: 'San Nicolas'
  }
  constructor(
    private cartService: CartService,
    @Inject(DOCUMENT) private document,
    private r: Renderer2,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private andreaniService: ShippingService,
    private salesPipe: SalesPipe,
  ) { }
  ngOnInit(): void {
    this.r.setStyle(document.body, 'background-color', '#f3f3f3');
    this.activatedRoute.children.forEach((r: any) => {
      this.title = r.url.value[0].path;
    });
    this.router.events.subscribe((val: any) => {
      if (val.url === '/carrito/datos') {
        this.title = '¿Estos datos son correctos?';
      } else {
        this.title = 'productos';
      }
    });
    this.calculateCostProduct();
    this.user = this.userService.loadPayload();
  }
  ngOnDestroy() {
    this.r.setStyle(document.body, 'background-color', 'white');
  }
  calculateCostProduct() {
    this.productsPrice = 0;
    this.products = this.cartService.getProducts();
    this.products.forEach((p) => {
      if (p.sale > 0) {
        let sale = this.salesPipe.transform(p.price, p.sale);
        this.productsPrice += sale;
      } else {
        this.productsPrice += p.price;
      }
    });
    this.total = this.productsPrice;
  }

  calculateSendCost() {
    this.loadingCostToSend = true;
    this.andreaniService.getCredentials().subscribe((credentials) => {
      if (credentials) {
        this.andreaniService.costShipping(this.user.cp, this.products, 'BAR').subscribe((val) => {
          this.costSend = parseInt(val.response.tarifaConIva.total);
          this.total += this.costSend;
          this.loadingCostToSend = !this.loadingCostToSend;
          this.costToSendCalculated = true;
        })
      } else {
        console.error('Credentials were not loaded');
      }
    })
  }
  checkout() {
    if (this.costSend) {
      this.router.navigateByUrl('procesar_pago', {
        state: {
          price: this.total,
          shippingType: this.selected_type_shipping,
          selectedBranchOffice: this.selected_branch_office,
          costToSend: this.costSend
        }
      });
    } else {
      this.router.navigateByUrl('procesar_pago', {
        state: {
          price: this.total,
          shippingType: this.selected_type_shipping,
          selectedBranchOffice: this.selected_branch_office,
        }
      });
    }
  }
  toggleModalShipping(selected_shipping = false) {
    if (selected_shipping) {
      this.router.navigate(['/carrito/datos'])
    }
    this.displayShipping = !this.displayShipping;
  }
  componentActivated(event: CartProductsComponent) {
    if (event.productDeleted) {
      event.productDeleted.subscribe(value => {
        this.calculateCostProduct();
      });
    }
  }
  toggleModalBranchOffice(acepted = false) {
    this.displayShowBranchOffice = !this.displayShowBranchOffice;
    if (acepted && this.selected_type_shipping == 'andreani') {
      this.calculateSendCost()
      this.displayCostToSend = true;
    }
  }
}
