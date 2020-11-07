import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './../shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    HomeComponent,
    ProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
