import {  } from '@angular/core';
import {Ingredient} from "../shared/ingredient";

export class ShoppingListService {

  private items: Ingredient[] = [];

  constructor() { }

  getItems(): Ingredient[] {
    return this.items;
  }

  addItems(value: Ingredient[]) {
    Array.prototype.push.apply(this.items,value);
  }

  addItem(item: Ingredient){
    this.items.push(item);
  }

  editItem(oldItem:Ingredient,newItem: Ingredient){
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingredient){
    this.items.splice(this.items.indexOf(item),1);
  }
}
