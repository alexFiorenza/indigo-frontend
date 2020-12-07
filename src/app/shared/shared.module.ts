import { ReactiveFormsModule } from '@angular/forms';
import { LoaderBtnComponent } from './components/loader-btn/loader-btn.component';
import { SalesPipe } from './pipes/sales.pipe';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, SalesPipe, LoaderBtnComponent],
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
