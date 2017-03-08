import {Injectable, EventEmitter} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import * as _ from "lodash";
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {AppService} from "../app.service";


@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes:Recipe[];

  constructor(private http:Http, private appSvc:AppService) { }

  getRecipes(){
    return this.recipes;
  }

  getRecipeById(id:number):Recipe{
    return _.find(this.recipes,{id:id});
  }

  addRecipe(item:Recipe){
    this.recipes.push(item);
  }

  editRecipe(oldItem:Recipe,newItem:Recipe){
    newItem.id = oldItem.id;
    this.recipes[this.recipes.indexOf(oldItem)] = newItem;
  }

  deleteRecipe(id:number):boolean{
    _.remove(this.recipes, {
      id: id
    });
    return true;
  }

  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    let uri = this.appSvc.baseURL+'recipes.json';

    return this.http.put(uri,body,{'headers':headers});
  }

  fetchData(){
    let uri = this.appSvc.baseURL+'recipes.json';
    return this.http.get(uri)
      .map((response:Response) => response.json())
      .subscribe(
        (data:Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }

}
