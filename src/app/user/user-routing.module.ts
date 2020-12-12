import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExplorerContainerComponent } from './explorer-container/explorer-container.component';
import { FavoritesComponent } from './tabs/favorites/favorites.component';
import { UserOrdersComponent } from './tabs/user-orders/user-orders.component';
import { SettingsComponent } from './tabs/settings/settings.component';
import { DataUserComponent } from './tabs/data-user/data-user.component';
import { UserGuard } from '../core/guards/user.guard';
const USER_ROUTES: Routes = [
    {
        path: 'panel',
        component: ExplorerContainerComponent,
        canActivate: [UserGuard],
        children: [
            {
                path: '',
                redirectTo: 'datos',
                pathMatch: 'full'
            },
            {
                path: 'datos',
                component: DataUserComponent
            },
            {
                path: 'favoritos',
                component: FavoritesComponent
            },
            {
                path: 'pedidos',
                component: UserOrdersComponent
            },
            {
                path: 'ajustes',
                component: SettingsComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(USER_ROUTES)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
