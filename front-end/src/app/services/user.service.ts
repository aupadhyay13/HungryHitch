import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import { User } from "../models/User";
import { USER_LOGIN_URL, USER_REGISTER_URL } from "../constants/constant";

@Injectable({
    providedIn: 'root'
  })

export class UserService{
    public userSubject =
    new BehaviorSubject<any>(this.getUserFromLocalStorage());
    public userObservable:Observable<any>;
    constructor(private http:HttpClient, private toastrService:ToastrService) {
        this.userObservable = this.userSubject.asObservable();
      }
    
    login(userLogin:any):Observable<User>{
        return this.http.post<any>(USER_LOGIN_URL, userLogin).pipe(
          tap({
            next: (user : any) =>{
                console.log("user data is---->",user);
              if(user.status == "success"){
                this.setUserToLocalStorage(user.data);
                this.userSubject.next(user.data);
                this.toastrService.success('',  user.message);
              }else{
                this.toastrService.error('', user.message);

              }
               
              
            },
            error: (errorResponse) => {
              this.toastrService.error(errorResponse.error, 'Login Failed');
            }
          })
        );
      }

      public getUserFromLocalStorage(): User{
        const userData = localStorage.getItem('User');
        if(userData){
            return JSON.parse(userData) as User;   
        }
        return new User();
      }

      private setUserToLocalStorage(user:User){
        localStorage.setItem('User', JSON.stringify(user));
      }

      public removeFromLocalStorage(){
        localStorage.removeItem('User');
        this.userSubject.next(new User());
      }


  public register(userRegiser:any): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user :any) => {
          this.setUserToLocalStorage(user.data);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Hungry Hitch ${user.name}`,
            user.message
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }
    
} 