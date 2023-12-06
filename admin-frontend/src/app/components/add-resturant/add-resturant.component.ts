import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html',
  styleUrls: ['./add-resturant.component.scss']
})
export class AddResturantComponent {
  resturantAddForm: any;
  fileToUpload: any | null = null;
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
    this.resturantAddForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  addFood() {
    const formData = new FormData();
    formData.append('name', this.resturantAddForm.value.name);
    formData.append('description', this.resturantAddForm.value.description);
    formData.append('address', this.resturantAddForm.value.address);
    formData.append('logo', this.fileToUpload);
    console.log("foodData data is--->",formData);
    this.adminService.addResturant(formData).subscribe((res: any) => {
        console.log("res is--------->",res);
       if(res.status == "fail"){
        this.notificationService.showError(res.message);
       }else{
        this.notificationService.showSuccess(res.message);
        this.resturantAddForm.reset();
       }
    }, (err: any) => {
        this.notificationService.showError(err.error.error);
      });
  }

  handleFileInput(event: any) {
    if(event){
      this.fileToUpload = event.target.files.item(0)
    }
  }
}
