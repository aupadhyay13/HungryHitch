import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequestService } from '../services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private httpRequest: HttpRequestService

  ) { }

  addAdmin(detail: any) {
    return this.httpRequest.postRequest('admin/create-admin', detail);
  }

  addFoodItem(detail: any) {
    return this.httpRequest.postRequest('admin/add-product', detail);
  }

  addFoodCategory(detail: any) {
    return this.httpRequest.postRequest('admin/add-food-category', detail);
  }

  addResturant(detail: any) {
    return this.httpRequest.postRequest('admin/add-resturant', detail);
  }


  getAdminList() {
    return this.httpRequest.getRequest('admin/get-admin-list',this.getTokenFromLocalStorage());
  }

  getFoodList() {
    return this.httpRequest.getRequest('admin/get-product-list',this.getTokenFromLocalStorage());
  }

  getResturantList() {
    return this.httpRequest.getRequest('admin/get-resturant-list',this.getTokenFromLocalStorage());
  }
  getCategoryList() {
    return this.httpRequest.getRequest('admin/get-category-list',this.getTokenFromLocalStorage());
  }

  getUserList() {
    return this.httpRequest.getRequest('admin/get-user-list',this.getTokenFromLocalStorage());
  }

  getOrderList(){
    return this.httpRequest.getRequest('admin/get-order-list',this.getTokenFromLocalStorage());
  }

  changeAdminStatus(reqObj : any) {
    return this.httpRequest.getRequest('admin/disable-enable-admin',this.getTokenFromLocalStorage(),reqObj);
  }

  changeFoodItemStatus(reqObj : any) {
    return this.httpRequest.getRequest('admin/disable-enable-food',this.getTokenFromLocalStorage(),reqObj);
  }

  changeResturantStatus(reqObj : any) {
    return this.httpRequest.getRequest('admin/disable-enable-resturant',this.getTokenFromLocalStorage(),reqObj);
  }

  getTokenFromLocalStorage(){
    const adminData : any = localStorage.getItem('Admin');
    const  { token } = JSON.parse(adminData);
    return token;

  }

  getAdminId(){
    const adminData: any = localStorage.getItem("Admin");
    const  { email } = JSON.parse(adminData);
    return email;
  }


  getAdminName(){
    const adminData: any = localStorage.getItem("Admin");
    const  { name } = JSON.parse(adminData);
    return name;
  }

}
