import { UserDataComponent } from './register/user-data/user-data.component';
import { CheckLocationComponent } from './register/check-location/check-location.component';
import { UserService } from './../core/services/http/api/user/user.service';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, CheckLocationComponent, UserDataComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
