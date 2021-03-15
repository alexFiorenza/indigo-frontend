import { PrimengModule } from './../shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CartProductsComponent } from './cart/cart-products/cart-products.component';
import { CartUserDataComponent } from './cart/cart-user-data/cart-user-data.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SalesPipe } from '../shared/pipes/sales.pipe';
import { ContactModule } from './contact/contact.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    CartProductsComponent,
    CartUserDataComponent,
    CheckoutComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SwiperModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SharedModule,
    ContactModule
  ],
  exports: [
    HomeComponent,
    ProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SalesPipe]
})
export class PagesModule { }
