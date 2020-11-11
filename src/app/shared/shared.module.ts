import { LoaderBtnComponent } from './components/loader-btn/loader-btn.component';
import { SalesPipe } from './pipes/sales.pipe';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './header/cart/cart.component';

@NgModule({
  declarations: [HeaderComponent, SalesPipe, LoaderBtnComponent, CartComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    LoaderBtnComponent,
    SalesPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
