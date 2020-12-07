import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExplorerContainerComponent } from './explorer-container/explorer-container.component';
import { FavoritesComponent } from './tabs/favorites/favorites.component';
import { UserOrdersComponent } from './tabs/user-orders/user-orders.component';
import { SettingsComponent } from './tabs/settings/settings.component';
import { DataUserComponent } from './tabs/data-user/data-user.component';
const USER_ROUTES: Routes = [
    {
        path: 'panel',
        component: ExplorerContainerComponent,
        children: [
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
    },
    {
        path: '',
        redirectTo: 'panel/datos',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forChild(USER_ROUTES)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
