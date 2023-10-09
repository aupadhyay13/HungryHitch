import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequestService } from '../services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private httpRequest: HttpRequestService

  ) { }

  login(detail: any) {
    return this.httpRequest.postRequest('admin/login', detail);
  }

}
