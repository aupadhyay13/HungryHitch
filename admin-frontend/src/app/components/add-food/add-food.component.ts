import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent {
  foodAddForm: any;
  foodData = { name: '', price: 0 , cookTime: '', image: ''};
  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private notificationService: NotificationAlertService,
    private adminService: AdminService){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    this.foodAddForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(2)]),
      cookTime: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  addFood() {
    this.foodData.name =  this.foodAddForm.value.name;
    this.foodData.price =  this.foodAddForm.value.price;
    this.foodData.cookTime =  this.foodAddForm.value.cookTime;
    this.foodData.image =  this.foodAddForm.value.image;
    console.log("foodData data is--->",this.foodData);
    this.adminService.addFoodItem(this.foodData).subscribe((res: any) => {
        console.log("res is--------->",res);
       if(res.status == "fail"){
        this.notificationService.showError(res.message);
       }else{
        this.notificationService.showSuccess(res.message);
        this.foodAddForm.reset();
       }
    }, (err: any) => {
        this.notificationService.showError(err.error.error);
      });
  }

}
