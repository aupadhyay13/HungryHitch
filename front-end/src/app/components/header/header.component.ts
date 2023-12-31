import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: Boolean = false;
  public userData: any;
  cartQuantity=0;
  searchTerm = '';
  constructor(cartService:CartService, public userService: UserService, public router: Router) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
  }
  
  navigateHome(): void {
    // Clear the search term and navigate to the home page
    console.log("hello");
    this.router.navigate(['/home'],{ queryParams: { term: null } });
    this.searchTerm = '';
    
  }

  ngOnInit(): void {
    this.userService.userSubject.subscribe((data) => {
      this.userData = data;
      if (Object.keys(this.userData).length > 0) {
        this.isLoggedIn = true;
      }
    });
  }

  logout() {
    this.userService.removeFromLocalStorage();
    this.isLoggedIn = false;
    this.router.navigate(['/authentication']);
  }
}
