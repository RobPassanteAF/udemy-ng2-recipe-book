import { Component, OnInit,OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipe";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private recipeId:number;
  private subscription:Subscription;
  private recipe:Recipe;
  private isNew:boolean = true;
  private recipeForm:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rs: RecipeService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.recipeId = +params['id'];
          this.recipe = this.rs.getRecipeById(this.recipeId);
        }else{
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private initForm(){
    let recipeName = '';
    let recipePath = '';
    let recipeDescription = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(!this.isNew){
      _.map(this.recipe.ingredients, function(item:Ingredient){
        let newGroup:FormGroup = new FormGroup(
          {
            name: new FormControl(item.name, Validators.required),
            amount: new FormControl(item.amount, [
              Validators.required,
              Validators.pattern("\\d+")
            ])
          }
        );
        recipeIngredients.push(newGroup);
      });
      recipeName = this.recipe.name;
      recipePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group(
      {
        name: [recipeName, Validators.required],
        imagePath: [recipePath, Validators.required],
        description: [recipeDescription, Validators.required],
        ingredients: recipeIngredients
      }
    );
  }

  onAddIngredient(name:string, amount:string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup(
        {
          name: new FormControl(name, Validators.required),
          amount: new FormControl(amount, [
            Validators.required,
            Validators.pattern("\\d+")
          ])
        }
      )
    )
  }

  onRemoveIngredient(idx:number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(idx);
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(this.isNew){
      this.rs.addRecipe(newRecipe);
    }else{
      this.rs.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  navigateBack(){
    this.router.navigate(['../']);
  }

}
