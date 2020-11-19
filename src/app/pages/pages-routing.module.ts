import { CartUserDataComponent } from './cart/cart-user-data/cart-user-data.component';
import { CartProductsComponent } from './cart/cart-products/cart-products.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
