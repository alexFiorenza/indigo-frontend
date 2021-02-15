import { CartUserDataComponent } from './cart/cart-user-data/cart-user-data.component';
import { CartProductsComponent } from './cart/cart-products/cart-products.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutGuard } from '../core/guards/checkout.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { CartSelectShippingComponent } from './cart/cart-select-shipping/cart-select-shipping.component';

const routes: Routes = [
  {
    path: 'carrito',
    component: CartComponent,
    children: [
      {
        path: '',
        redirectTo: 'productos',
        pathMatch: 'full'
      },
      {
        path: 'productos',
        component: CartProductsComponent
      },
      {
        path: 'datos',
        component: CartUserDataComponent
      }
    ]
  },
  {
    path: 'procesar_pago',
    component: CheckoutComponent,
    canActivate: [CheckoutGuard]
  },
  {
    path: 'inicio',
    component: HomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
