import { Component, Input, OnInit } from '@angular/core';

import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  @Input() repositoriesData: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {}
}
