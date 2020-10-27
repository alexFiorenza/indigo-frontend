import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const AUTH_ROUTES: Routes = [
    {
        path: 'ingresar',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegisterComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(AUTH_ROUTES)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
