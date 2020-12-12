import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrdersComponent } from './tabs/user-orders/user-orders.component';
import { SettingsComponent } from './tabs/settings/settings.component';
import { FavoritesComponent } from './tabs/favorites/favorites.component';
import { ExplorerContainerComponent } from './explorer-container/explorer-container.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DataUserComponent } from './tabs/data-user/data-user.component';
import { SwiperModule } from 'ngx-swiper-wrapper';



@NgModule({
  declarations: [UserOrdersComponent, SettingsComponent, FavoritesComponent, ExplorerContainerComponent, DataUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SwiperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
