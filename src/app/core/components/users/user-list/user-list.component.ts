import { Component, Input } from '@angular/core';

import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() usersData: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  constructor() {}
}
