import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
