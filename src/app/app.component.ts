import { Component } from '@angular/core';

import users from '../mocks/users.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-hub-search';
  usersData: any;

  constructor() {
    this.usersData = users;
  }
}
