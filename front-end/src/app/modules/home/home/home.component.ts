import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  foods:Food[] = [];

  constructor(private foodService: FoodService)
  {
      this.foods = foodService.getAll();
  }
  ngOnInit(): void {
    this.getFoodList();
  }


  getFoodList(){
    this.foodService.getfoodItems().subscribe((data : any) => {
        if(data.status == "success"){
          console.log("food list is--->",data);
          this.foods = data.data;
        }
    })
  }

}
