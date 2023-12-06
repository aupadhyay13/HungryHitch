import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';
import { SearchComponent } from 'src/app/components/search/search.component';


const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'detail/:id',
      component: DetailComponent
    }
  ];
@NgModule({
  declarations: [
    SearchComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
