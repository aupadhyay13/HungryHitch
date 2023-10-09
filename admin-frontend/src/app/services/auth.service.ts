import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enableAllTheme = new Subject<any>();

  constructor(
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('x-auth-token');
    if (!token) {
      return false;
    }
    return true;
  }

  resolve(): void {
    if (this.isAuthenticated()) {
    //  this.router.navigate(['/dashboard'])
    }
  }

  logout() {
    localStorage.removeItem('Admin');
    this.router.navigate(['']);
  }


  public setLocalStorage(admin : any){
    localStorage.setItem('Admin', JSON.stringify(admin));
  }
}
