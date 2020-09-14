import { Component, Input, OnInit } from '@angular/core';
import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() usersData: DefaultResult;

  constructor() {}

  ngOnInit(): void {}
}
