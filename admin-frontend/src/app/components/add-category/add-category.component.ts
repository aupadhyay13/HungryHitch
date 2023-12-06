import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  categoryAddForm: any;
  categoryData = { name: '', description: '' };
  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private notificationService: NotificationAlertService,
    private adminService: AdminService){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    this.categoryAddForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  addCategory() {
    
    this.adminService.addFoodCategory({name: this.categoryAddForm.value.name,description : this.categoryAddForm.value.description}).subscribe((res: any) => {
        console.log("res is--------->",res);
       if(res.status == "fail"){
        this.notificationService.showError(res.message);
       }else{
        this.notificationService.showSuccess(res.message);
        this.categoryAddForm.reset();
       }
    }, (err: any) => {
        this.notificationService.showError(err.error.error);
      });
  }

}
