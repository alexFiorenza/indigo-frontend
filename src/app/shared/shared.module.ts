import { ReactiveFormsModule } from '@angular/forms';
import { LoaderBtnComponent } from './components/loader-btn/loader-btn.component';
import { SalesPipe } from './pipes/sales.pipe';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [HeaderComponent, SalesPipe, LoaderBtnComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    LoaderBtnComponent,
    SalesPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
