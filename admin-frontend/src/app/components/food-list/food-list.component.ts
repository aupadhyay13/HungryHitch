import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationAlertService } from 'src/app/services/notification-alert.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent {
  foodList: any = [];
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationAlertService
    ){

  }

  ngOnInit(): void {
    this.authService.enableAllTheme.next(true);
    
    this.adminService.getFoodList().subscribe((res: any) => {
        if(res.status == 'success'){
          this.foodList = res.data;
          console.log("food list is--->",this.foodList);
        }
    })
  }

  disableFoodItem(id : any, status : any){
    status = !status;
      this.adminService.changeFoodItemStatus({_id: id,status}).subscribe((res: any) => {
      if(res.status == 'success'){
        this.notificationService.showSuccess(res.message);
      }
  })
  }
}
