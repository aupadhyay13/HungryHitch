import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';

import { DefaultButtonComponent } from 'src/app/components/default-button/default-button.component';
import { TextInputComponent } from 'src/app/components/text-input/text-input.component';
import { InputContainerComponent } from 'src/app/components/input-container/input-container.component';
import { InputValidationComponent } from 'src/app/components/input-validation/input-validation.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { CheckoutPageComponent } from '../checkout-page/checkout-page.component';
import { OrderItemsListComponent } from 'src/app/components/order-items-list/order-items-list.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { PaymentComponent } from '../payment/payment.component';
import { PaypalButtonComponent } from 'src/app/components/paypal-button/paypal-button.component';
import { OrderTrackComponent } from '../order-track/order-track.component';


@NgModule({
  declarations: [
    LoginComponent,
    DefaultButtonComponent,
    TitleComponent,
    RegisterComponent,
    UserProfileComponent,
    TextInputComponent,
    InputContainerComponent,
    InputValidationComponent,
    CartPageComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentComponent,
    PaypalButtonComponent,
    OrderTrackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
})
export class AuthenticationModule { }
