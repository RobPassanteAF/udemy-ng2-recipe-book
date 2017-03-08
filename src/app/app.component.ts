import {Component, OnInit} from '@angular/core';
import {RecipeService} from "./recipes/recipe.service";

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  providers: [RecipeService]
})
export class AppComponent implements OnInit{

  constructor(private recipeSvc:RecipeService){ }

  ngOnInit(){
    this.recipeSvc.fetchData();
  }
}
