import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-home',
  template: `
   <h1>Welcome to the Angular2 Recipe Book!</h1>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
