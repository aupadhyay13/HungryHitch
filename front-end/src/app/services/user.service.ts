import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import { User } from "../models/User";
import { USER_LOGIN_URL, USER_REGISTER_URL } from "../constants/constant";
import { HttpRequestService } from "./http-requests.service";

@Injectable({
    providedIn: 'root'
  })

export class UserService{
    public userSubject =
    new BehaviorSubject<any>(this.getUserFromLocalStorage());
    public userObservable:Observable<any>;
    constructor(private http:HttpClient, private toastrService:ToastrService,
      private httpRequestService: HttpRequestService
      ) {
        this.userObservable = this.userSubject.asObservable();
      }
    
      login(userLogin:any){
        return this.httpRequestService.postRequest('user/login', userLogin);
      }

      getUserProfile(){
        return this.httpRequestService.getRequest('user/get-profile', this.getLoggedInUserData("token"));
      }

      updateUserProfile(data: any){
        data._id = this.getLoggedInUserData("userId");
        return this.httpRequestService.postRequest('user/update-profile', data);
      }

      public getUserFromLocalStorage(): User{
        const userData = localStorage.getItem('User');
        if(userData){
            return JSON.parse(userData) as User;   
        }
        return new User();
      }

      public getLoggedInUserData(type : string) {
        const userData = localStorage.getItem('User');
        if(userData && type=="userId"){
          return JSON.parse(userData)['_id']
        }
        if(userData && type=="token"){
          return JSON.parse(userData)['token']
        }
      }

      public setUserToLocalStorage(user:User){
        localStorage.setItem('User', JSON.stringify(user));
      }

      public removeFromLocalStorage(){
        localStorage.removeItem('User');
        this.userSubject.next(new User());
      }

  register(userRegiser:any){
    return this.httpRequestService.postRequest('user/signup', userRegiser);
  }
    
} 