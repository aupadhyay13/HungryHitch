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

  getAdminList() {
    return this.httpRequest.getRequest('admin/get-admin-list',this.getTokenFromLocalStorage());
  }

  getUserList() {
    return this.httpRequest.getRequest('admin/get-user-list',this.getTokenFromLocalStorage());
  }


  changeAdminStatus(reqObj : any) {
    return this.httpRequest.getRequest('admin/disable-enable-admin',this.getTokenFromLocalStorage(),reqObj);
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
