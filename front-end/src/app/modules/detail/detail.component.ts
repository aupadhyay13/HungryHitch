import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  food!: Food;

  constructor(private activatedRoute:ActivatedRoute, private foodService:FoodService,
    private cartService:CartService, 
    private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'])
      {
        console.log("id is--->",params['id']);
        this.getFoodItem(params['id']);
      }
      // this.food=foodService.getfoodItem(params['id'])[0];
      
      // foodService.getFoodById(params['id']).subscribe(serverFood => {
      //   this.food = serverFood;
      // });
    })
    
   }
  ngOnInit(): void {
    console.log('foogf',this.food)
  }
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  getFoodItem(foodId : any){
    this.foodService.getfoodItem({foodId}).subscribe((item : any) => {
        if(item.status == "success"){
          console.log("item is-->",item);
          this.food = item.data;
        }
    })
  }

}
