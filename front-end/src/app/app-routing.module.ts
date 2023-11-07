import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(auth => auth.AuthenticationModule )
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(auth => auth.HomeModule )
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
