import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProductComponent } from './register-product/register-product.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';

const routes: Routes = [
  {path:'', component:RestaurantHomeComponent},
  { path:'restaurant',component:RegisterRestaurantComponent},
  { path:'add_product/:id',component: RegisterProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
