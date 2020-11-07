import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'productos',
    component: ProductsComponent,
  },
    {
      path: 'productos/:id',
      component: SingleProductComponent
    },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
