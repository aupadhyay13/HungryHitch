import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.UserProfileForm = this.formBuilder.group({
      Name: [{ value: 'Aditya', disabled: !this.isEditMode }, Validators.required],
      email: [{ value: 'Adi123@gmail.com', disabled: !this.isEditMode }, [Validators.required, Validators.email]],
    });
    this.fc['Name'] = this.UserProfileForm.get('Name');
    this.fc['email'] = this.UserProfileForm.get('email');
  }

  ngOnInit(): void {
    
  }

  onEditClick() {
    if (this.isEditMode) {
      this.UserProfileForm.get('Name')?.disable();
      this.UserProfileForm.get('email')?.disable();
    } else {
      this.UserProfileForm.get('Name')?.enable();
      this.UserProfileForm.get('email')?.enable();
    }
    this.isEditMode = !this.isEditMode;
  }

  onDiscardClick() {
    this.UserProfileForm.get('Name')?.setValue('Aditya');
    this.UserProfileForm.get('email')?.setValue('Adi123@gmail.com');
    this.UserProfileForm.get('Name')?.disable();
    this.UserProfileForm.get('email')?.disable();
    this.isEditMode = false;
  }
}
