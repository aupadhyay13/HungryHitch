import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-resturant-list',
  templateUrl: './resturant-list.component.html',
  styleUrls: ['./resturant-list.component.scss']
})
export class ResturantListComponent {
  resturantList: any = [];
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationAlertService
    ){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    
    this.adminService.getResturantList().subscribe((res: any) => {
        if(res.status == 'success'){
          this.resturantList = res.data;
          console.log("resturant list is--->",this.resturantList);
        }
    })
  }

  disableResturant(id : any, status : any){
    status = !status;
      this.adminService.changeResturantStatus({_id: id,status}).subscribe((res: any) => {
      if(res.status == 'success'){
        this.notificationService.showSuccess(res.message);
      }
  })
  }
}
