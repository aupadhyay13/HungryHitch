import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';

import { DefaultButtonComponent } from 'src/app/components/default-button/default-button.component';
import { AppModule } from 'src/app/app.module';
import { TextInputComponent } from 'src/app/components/text-input/text-input.component';
import { InputContainerComponent } from 'src/app/components/input-container/input-container.component';
import { InputValidationComponent } from 'src/app/components/input-validation/input-validation.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from '../user-profile/user-profile.component';



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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
})
export class AuthenticationModule { }
