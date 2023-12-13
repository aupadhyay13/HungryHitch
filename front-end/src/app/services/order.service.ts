import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpRequestService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient,private httpRequestService: HttpRequestService) { }

  create(orderData:any){
    orderData.userId = this.getLoggedInUserData("userId");
    return this.httpRequestService.postRequest('user/create-order', orderData);
  }

  getNewOrderForCurrentUser():any{
    return this.httpRequestService.getRequest('user/new-order-for-current-user', this.getLoggedInUserData("token"));
  }

  pay(orderData:any){
    orderData.userId = this.getLoggedInUserData("userId");
    return this.httpRequestService.postRequest('user/pay', orderData);
  }

  trackOrderById(id:number): any{
    return this.httpRequestService.getRequest(`user/order-track/${id}`, this.getLoggedInUserData("token"));
  }

  public getLoggedInUserData(type : string) {
    const userData = localStorage.getItem('User');
    if(userData && type=="userId"){
      return JSON.parse(userData)['id']
    }
    if(userData && type=="token"){
      return JSON.parse(userData)['token']
    }
  }

}