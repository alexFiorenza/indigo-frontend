import { LocationGuard } from './../core/guards/location.guard';
import { CheckLocationComponent } from './register/check-location/check-location.component';
import { UserDataComponent } from './register/user-data/user-data.component';
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
        component: RegisterComponent,
        children: [
            {
                path: '',
                redirectTo: 'datos',
                pathMatch: 'full'
            },
            {
                path: 'datos',
                component: UserDataComponent
            },
            {
                path: 'ubicacion',
                canActivate: [LocationGuard],
                component: CheckLocationComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(AUTH_ROUTES)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
