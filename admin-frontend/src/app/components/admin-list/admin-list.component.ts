import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit{
  adminList: any = [];
  adminID: any;
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationAlertService
    ){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    this.adminID = this.getAdminId();
    this.adminService.getAdminList().subscribe((res: any) => {
        if(res.status == 'success'){
          this.adminList = res.data;
          console.log("admin list is--->",this.adminList);
        }
    })
  }

  getAdminId(){
    return this.adminService.getAdminId();
  }

  disableAdmin(id : any, status : any){
    status = !status;
      this.adminService.changeAdminStatus({_id: id,status}).subscribe((res: any) => {
      if(res.status == 'success'){
        this.notificationService.showSuccess(res.message);
      }
  })
  }
}
