import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DafaWeb';

  menuDestinations = [
    { 'name': 'Sample', 'route': '/sample', 'alt': '', 'id': '05c5cbda-ca9e-4361-8b2f-7216906f189c' },
    { 'name': 'Log in', 'route': '/login', 'alt': 'Log out', 'id': 'c509b18a-7ed7-4e62-9c64-9c65fb5dae33' },
  ];
}
