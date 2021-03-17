import { CartUserDataComponent } from './cart/cart-user-data/cart-user-data.component';
import { CartProductsComponent } from './cart/cart-products/cart-products.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutGuard } from '../core/guards/checkout.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact/contact.component';
import { TermsConditionsComponent } from './contact/terms-conditions/terms-conditions.component';
import { InformationComponent } from './contact/information/information.component';
import { PrivacyComponent } from './contact/privacy/privacy.component';

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
  },
  {
    path: 'contacto',
    component: ContactComponent,
    children: [
      {
        path: '',
        redirectTo: 'informacion',
        pathMatch: 'full'
      },
      {
        path: 'terminos-condiciones',
        component: TermsConditionsComponent
      },
      {
        path: 'informacion',
        component: InformationComponent
      },
      {
        path: 'privacidad',
        component: PrivacyComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
