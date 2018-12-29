import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DafaWeb';

  menuDestinations = [
    { 'name': 'Sample', 'route': '/sample', 'alt': '' },
    { 'name': 'Log in', 'route': '/login', 'alt': 'Log out' },
  ];
}
