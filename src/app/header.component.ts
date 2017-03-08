import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {Ingredient} from "./shared/ingredient";
import {RecipeService} from "./recipes/recipe.service";

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  shoppingList:Ingredient[] = [];

  constructor(private shoppingListSvc:ShoppingListService, private recipeSvc:RecipeService) { }

  ngOnInit() {
    this.shoppingList = this.shoppingListSvc.getItems();
  }

  onStore(){
    this.recipeSvc.storeData().subscribe(
      (data:any) => console.log(data),
      (error:any) => console.log(error)
    )
  }

  onRetrieve(){
    this.recipeSvc.fetchData();
  }

}
