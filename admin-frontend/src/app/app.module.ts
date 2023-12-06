import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { AddResturantComponent } from './components/add-resturant/add-resturant.component';
import { ResturantListComponent } from './components/resturant-list/resturant-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    AddAdminComponent,
    AdminListComponent,
    UserListComponent,
    AddFoodComponent,
    FoodListComponent,
    AddResturantComponent,
    ResturantListComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
     }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
