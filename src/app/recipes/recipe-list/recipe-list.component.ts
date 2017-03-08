import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit{

  constructor(private recipeService:RecipeService) { }

  recipes: Recipe[] = [];

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }

  ngOnDestroy(){

  }

}
