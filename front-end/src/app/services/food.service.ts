import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { Food } from '../models/Food';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { AnimationPlayer } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAll():any{
    return sample_foods;
  }
  getFoodById(foodId:string){
    debugger;
    return this.getAll().filter((item: any) => item.id == foodId);

}
}