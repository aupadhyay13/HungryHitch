import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DefaultButtonComponent} from '../../../components/default-button/default-button.component';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder: FormBuilder,
     private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc["email"].value,
       password: this.fc['password'].value}).subscribe((data: any) => {
        if(data.status == "success"){
          console.log("data is---->",data);
          this.toastrService.success('',  data.message);
          this.userService.setUserToLocalStorage(data.data);
          this.userService.userSubject.next(data.data);
          this.router.navigate(['/home'])
        }else{
          this.toastrService.error('',  data.message);
        }

       },(err: any) => {
        this.toastrService.error(err.error, 'Login Failed');
       });
  }

}
