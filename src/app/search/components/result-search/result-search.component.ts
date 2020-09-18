import { Component, Input, OnInit } from '@angular/core';

import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss'],
})
export class ResultSearchComponent implements OnInit {
  @Input() data: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {}
}
