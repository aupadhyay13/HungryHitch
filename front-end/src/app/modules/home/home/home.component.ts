import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("params areee--->",params);
      
      if (params.term)
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.term);
      else
        this.foods = foodService.getAll();
    }
)}
  ngOnInit(): void {
      // this.getFoodList();
    }


  getFoodList(){
      this.foodService.getfoodItems().subscribe((data: any) => {
        if (data.status == "success") {
          console.log("food list is--->", data);
          this.foods = data.data;
        }
      })
    }
}
