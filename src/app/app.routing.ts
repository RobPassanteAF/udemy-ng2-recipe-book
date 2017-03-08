/**
 * Created by rpassant on 3/1/2017.
 */
import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PageNotFound} from "./page-not-found.component";
import {HomeComponent} from "./home.component";

const APP_ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: 'app/shopping-list/shopping-list.module#ShoppingListModule' },
  { path: '**', component: PageNotFound }
];

export const routing:ModuleWithProviders = RouterModule.forRoot( APP_ROUTES );
