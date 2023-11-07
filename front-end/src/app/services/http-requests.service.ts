import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(
    private http: HttpClient,
  ) { }

  getRequest(url: any, token: any,params?: any) {
    return this.http.get(`${environment.API_URL}${url}`, { params , headers: {authorization : token},observe: 'response' })
    .pipe(map((res) => res.body));
  }

  postRequest(url: any,data: any) {
    return this.http.post(`${environment.API_URL}${url}`, data, { observe: 'response' })
    .pipe(map((res) => res.body));
 }


   postGetFileRequest(url: any,data: any){
    const headers = new HttpHeaders().set('Accept', 'text/plain');
    return this.http.post(`${environment.API_URL}${url}`, data, { headers, responseType: 'text' })
    .subscribe((data: string) => console.log("data in api isssssssssssss---",data));
   }

 deleteRequest() {

 }
}
