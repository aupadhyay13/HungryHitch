import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orderList: any = [];
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationAlertService
    ){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    this.adminService.getOrderList().subscribe((res: any) => {
      if(res.status == 'success'){
        this.orderList = res.data;
        console.log("order list is--->",this.orderList);
      }
  })
  }

}
