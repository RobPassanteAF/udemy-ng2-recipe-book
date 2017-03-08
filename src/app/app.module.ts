import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DropdownDirective } from './dropdown.directive';
import { routing } from "./app.routing";
import { PageNotFound } from './page-not-found.component';
import { AppService } from "./app.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PageNotFound,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [AppService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
