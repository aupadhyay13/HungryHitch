import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  food!: Food;

  constructor(activatedRoute:ActivatedRoute, foodService:FoodService,
    // private cartService:CartService, 
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      debugger;
      if(params['id'])
      this.food=foodService.getFoodById(params['id'])[0];
    
      // foodService.getFoodById(params['id']).subscribe(serverFood => {
      //   this.food = serverFood;
      // });
    })
    
   }
  ngOnInit(): void {
    console.log('foogf',this.food)
  }
  addToCart(){
    // this.cartService.addToCart(this.food);
    // this.router.navigateByUrl('/cart-page');
  }

}
