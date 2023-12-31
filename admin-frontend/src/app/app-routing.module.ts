import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { AddResturantComponent } from './components/add-resturant/add-resturant.component';
import { ResturantListComponent } from './components/resturant-list/resturant-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'add-admin',
    component: AddAdminComponent
  },
  {
    path: 'admin-list',
    component: AdminListComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'add-food-item',
    component: AddFoodComponent
  },
  {
    path: 'food-list',
    component: FoodListComponent
  },
  {
    path: 'add-resturant',
    component: AddResturantComponent
  },
  {
    path: 'resturant-list',
    component: ResturantListComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
