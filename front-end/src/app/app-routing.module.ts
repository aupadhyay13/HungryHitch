import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { CartPageComponent } from './modules/cart-page/cart-page.component';
import { CheckoutPageComponent } from './modules/checkout-page/checkout-page.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { OrderTrackComponent } from './modules/order-track/order-track.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
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
  {
    path: 'cart-page',
    component: CartPageComponent
  },
  {
    path: 'checkout-page',
    component: CheckoutPageComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'track/:orderId',
    component: OrderTrackComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
