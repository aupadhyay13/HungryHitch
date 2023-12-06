import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private authService: AuthService,private adminService: AdminService){

  }

  ngOnInit(): void {
    this.getAdminName()
  }

  logout(){
    this.authService.logout();
  }

  getAdminName(){
    return this.adminService.getAdminName()
  }
}
