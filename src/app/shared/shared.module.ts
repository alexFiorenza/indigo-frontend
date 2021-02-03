import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderBtnComponent } from './components/loader-btn/loader-btn.component';
import { SalesPipe } from './pipes/sales.pipe';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ParseCurrencyPipe } from './pipes/parse-currency.pipe';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BlockUIModule } from 'primeng/blockui';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SaleProductComponent } from './components/sale-product/sale-product.component';
import { FullPageLoaderComponent } from './components/full-page-loader/full-page-loader.component';

@NgModule({
  declarations: [HeaderComponent, SalesPipe, LoaderBtnComponent, ParseCurrencyPipe, ProductModalComponent, SaleProductComponent, FullPageLoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BlockUIModule,
    ColorPickerModule,
    ToggleButtonModule,
    PrimengModule
  ],
  exports: [
    HeaderComponent,
    LoaderBtnComponent,
    SalesPipe,
    ParseCurrencyPipe,
    ColorPickerModule,
    ProductModalComponent,
    SaleProductComponent,
    FullPageLoaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CurrencyPipe, SalesPipe, ParseCurrencyPipe]
})
export class SharedModule { }
