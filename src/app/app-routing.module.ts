import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductsComponent,
  },
  {
    path: 'productos/:id',
    component: SingleProductComponent,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  //TODO Check redirecto 404 page in admin
  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '404',
  //   pathMatch: 'full'
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
