import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { Food } from '../models/Food';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { AnimationPlayer } from '@angular/animations';
import { HttpRequestService } from './http-requests.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpRequestService:HttpRequestService) { }
  getAll():any{
    return sample_foods;
  }
  getFoodById(foodId:string){
    return this.getAll().filter((item: any) => item.id == foodId);
  }

  getAllFoodsBySearchTerm(searchTerm: string): any{
    return this.getAll().filter((any: { name: string; }) => any.name.toLowerCase().includes(searchTerm.toLowerCase()) )
  }

  getfoodItems(): any{
    return this.httpRequestService.getRequest('user/get-food-list','');
  }

  getfoodItem(foodId :any): any{
    return this.httpRequestService.getRequest('user/get-food-item','',foodId);
  }
}