import {Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;

  constructor(
    private recipeService:RecipeService,
    private sls:ShoppingListService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = parseInt(params['id'],10);
        this.selectedRecipe = this.recipeService.getRecipeById(this.recipeIndex);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToShoppingList(){
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.selectedRecipe.id);
    this.router.navigate(['/recipes']);
  }

  editRecipe(){
    this.router.navigate(['/recipes', + this.selectedRecipe.id, 'edit',]);
  }

}
