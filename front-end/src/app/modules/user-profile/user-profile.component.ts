import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  UserProfileForm: FormGroup;
  isSubmitted: boolean = false;
  isEditMode: boolean = false;
  fc: any = {}; 
  userData: any;

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private toastrService: ToastrService) {
    this.UserProfileForm = this.formBuilder.group({
      name: [{ value: '', disabled: !this.isEditMode }, Validators.required],
      email: [{ value: '', disabled: !this.isEditMode }, [Validators.required, Validators.email]],
      address: [{ value: '', disabled: !this.isEditMode }, [Validators.required]],
    });
    this.fc['name'] = this.UserProfileForm.get('name');
    this.fc['email'] = this.UserProfileForm.get('email');
    this.fc['address'] = this.UserProfileForm.get('address');
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){
    this.userService.getUserProfile().subscribe((res : any) => {
        if(res.status == "success"){
          console.log("response is--->",res);
          this.userData = res.data;
          this.UserProfileForm.get('name')?.setValue(res.data.name);
          this.UserProfileForm.get('email')?.setValue(res.data.email);
          this.UserProfileForm.get('address')?.setValue(res.data.address);
        }
    })
  }


  onEditClick() {
    if (this.isEditMode) {
      this.isSubmitted = true;

      if(this.UserProfileForm.valid){
        this.updateUserProfile();
      }

    } else {
      this.UserProfileForm.get('name')?.enable();
      this.UserProfileForm.get('email')?.enable();
      this.UserProfileForm.get('address')?.enable();
    }
    this.isEditMode = !this.isEditMode;
  }

  updateUserProfile(){
    const updatedData = {
      name: this.UserProfileForm.get('name')?.value,
      email: this.UserProfileForm.get('email')?.value,
      address: this.UserProfileForm.get('address')?.value,
    }
    this.userService.updateUserProfile(updatedData).subscribe((res : any) => {
        if(res.status == "success"){
          this.toastrService.success('',  res.message);
        }else{
          this.toastrService.success('',  res.message);
        }
    })

  }

  onDiscardClick() {
    this.UserProfileForm.get('name')?.setValue(this.userData.name);
    this.UserProfileForm.get('email')?.setValue(this.userData.email);
    this.UserProfileForm.get('address')?.setValue(this.userData.address);
    this.UserProfileForm.get('name')?.disable();
    this.UserProfileForm.get('email')?.disable();
    this.UserProfileForm.get('address')?.disable();
    this.isEditMode = false;
  }
}
