import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userList: any = [];
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationAlertService
    ){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    this.adminService.getUserList().subscribe((res: any) => {
      if(res.status == 'success'){
        this.userList = res.data;
        console.log("user list is--->",this.userList);
      }
  })
  }

  disableUser(id : any, status : any){
    status = !status;
      this.adminService.changeAdminStatus({_id: id,status}).subscribe((res: any) => {
      if(res.status == 'success'){
        this.notificationService.showSuccess(res.message);
      }
  })
  }
}
