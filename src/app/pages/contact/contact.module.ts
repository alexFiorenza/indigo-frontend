import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { InformationComponent } from './information/information.component';



@NgModule({
  declarations: [ContactComponent, TermsConditionsComponent, PrivacyComponent, InformationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ContactComponent,
    TermsConditionsComponent,
    PrivacyComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactModule { }
