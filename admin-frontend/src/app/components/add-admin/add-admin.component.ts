import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {
  adminAddForm: any;
  adminData = { email: '', password: '', name: ''};
  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private notificationService: NotificationAlertService,
    private adminService: AdminService){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    this.adminAddForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  addAdmin() {
    this.adminData.email =  this.adminAddForm.value.email;
    this.adminData.password =  this.adminAddForm.value.password;
    this.adminData.name =  this.adminAddForm.value.name;
    console.log("adminData data is--->",this.adminData);
    this.adminService.addAdmin(this.adminData).subscribe((res: any) => {
        console.log("res is--------->",res);
       if(res.status == "fail"){
        this.notificationService.showError(res.message);
       }else{
        this.notificationService.showSuccess(res.message);
        this.adminAddForm.reset();
       }
    }, (err: any) => {
        this.notificationService.showError(err.error.error);
      });
  }

}
