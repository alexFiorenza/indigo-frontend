import { PanelComponent } from './panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminGuard } from '../core/guards/admin.guard';


const routes: Routes = [
  {
    path: 'administrar',
    component: PanelComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'productos',
        component: ProductsComponent
      },
      {
        path: 'inicio',
        component: HomeComponent
      },
      {
        path: 'ordenes',
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
