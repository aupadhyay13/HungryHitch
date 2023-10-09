import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginForm: any;
  loginData = { email: '', password: ''};
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private notificationService: NotificationAlertService
    ){

  }

  ngOnInit() {
    this.authService.enableAllTheme.next(false);
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    });
    // this.initOTPform();
  }

  login() {
    this.loginData.email =  this.loginForm.value.email;
    this.loginData.password =  this.loginForm.value.password;
    console.log("login data is--->",this.loginData);
    this.loginService.login(this.loginData).subscribe((res: any) => {
        console.log("res is--------->",res);
        if(res.status == "success"){
          this.authService.setLocalStorage(res.data);
          this.notificationService.showSuccess(res.message);
          this.route.navigate(['/dashboard']);
        }else{
          this.notificationService.showError(res.message);
        }
    }, (err: any) => {
        this.notificationService.showError(err.error.error);
      });
  }


}
