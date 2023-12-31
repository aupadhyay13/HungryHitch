import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';
declare var $: any;
@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit, DoCheck{
  foodAddForm: any;
  selectedCategories: any = [];
  fileToUpload: any | null = null;
  foodData = { name: '', price: 0 , cookTime: '', image: ''};
  resturantList: any;
  categoryList: any;
  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private notificationService: NotificationAlertService,
    private adminService: AdminService){

  }
  ngAfterViewInit() {
    
}

  ngOnInit(): void {

    
   
    this.foodAddForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(2)]),
      cookTime: new FormControl('', [Validators.required]),
      resturant: new FormControl('',[Validators.required]),
      categories: new FormControl([]),
      image: new FormControl('', [Validators.required]),
    });

    this.authService.enableAllTheme.next(true);

    this.adminService.getResturantList().subscribe((res: any) => {
      if(res.status == 'success'){
        this.resturantList = res.data.filter((item: any) => item.isDisabled == false).map((item: any) => item);
        // this.resturantList = 
        console.log("resturant list is--->",this.resturantList);
      }
  })
  this.adminService.getCategoryList().subscribe((res: any) => {
    if(res.status == 'success'){
      this.categoryList = res.data;
      console.log("category list is--->",this.resturantList);
    }
})

  }


  ngDoCheck(){
   console.log(this.foodAddForm.value)

  }

  changeDropdown(){
    console.log("aaayuu");
  }

  addFood() {
       console.log("Category",document.querySelectorAll(".select2-selection__choice"))
       const val: any = document.querySelectorAll(".select2-selection__choice");
       let selectedCategories = [];
       for(let i of val){
        console.log(i['title']);
        selectedCategories.push(i['title']);
       }
   console.log("foodAddForm is------------->",this.foodAddForm.value);
   console.log("selected categ is------------->",this.selectedCategories);
    const formData = new FormData();
    formData.append('name', this.foodAddForm.value.name);
    formData.append('price', this.foodAddForm.value.price);
    formData.append('cookTime', this.foodAddForm.value.cookTime);
    formData.append('foodImage', this.fileToUpload);
    console.log("foodData data is--->",formData);
    formData.append('resturant', this.foodAddForm.value.resturant);
    formData.append('categories', selectedCategories.join(','));
    this.adminService.addFoodItem(formData).subscribe((res: any) => {
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


  handleFileInput(event: any) {
    if(event){
      this.fileToUpload = event.target.files.item(0)
    }
  }

  onSelectedCategoriesChange() {
    console.log('Selected Categories:');
  }

}
