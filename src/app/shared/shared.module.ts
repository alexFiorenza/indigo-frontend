import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderBtnComponent } from './components/loader-btn/loader-btn.component';
import { SalesPipe } from './pipes/sales.pipe';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ParseCurrencyPipe } from './pipes/parse-currency.pipe';

@NgModule({
  declarations: [HeaderComponent, SalesPipe, LoaderBtnComponent, ParseCurrencyPipe],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    LoaderBtnComponent,
    SalesPipe,
    ParseCurrencyPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CurrencyPipe]
})
export class SharedModule { }
