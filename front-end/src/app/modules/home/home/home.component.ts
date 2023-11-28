import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods: any[] = [];

  constructor(private router:Router,private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("params areee--->",params);
      
      if (params.term)
        this.foods = this.getAllFoodsBySearchTerm(params.term);
      else
        this.getFoodList();
    }
)}
  ngOnInit(): void {
      // this.getFoodList();
    }

    getAllFoodsBySearchTerm(searchTerm: string): any{
      console.log("food sissss-------->",this.foods);
      console.log("searchTerm sissss-------->",searchTerm);
      return this.foods.filter((any: { name: string; }) => any.name.toLowerCase().includes(searchTerm.toLowerCase()) )
    }


  getFoodList(){
    console.log("aaayu ne aaama");
      this.foodService.getfoodItems().subscribe((data: any) => {
        console.log("data is-------->",data);
        if (data.status == "success") {
          console.log("food list is--->", data);
          this.foods = data.data;
        }
      })
    }

    navigate(foodId: any){
      console.log("foodId is--->",foodId);
      this.router.navigate([`/home/detail/${foodId}`])
    }
    
}
