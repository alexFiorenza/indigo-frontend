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
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    CartProductsComponent,
    CartUserDataComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SwiperModule,
    ClipboardModule,
    ReactiveFormsModule,
    CheckboxModule,
    SkeletonModule
  ],
  exports: [
    HomeComponent,
    ProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
