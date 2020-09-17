import { Component, Input } from '@angular/core';

import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.scss'],
})
export class CommitListComponent {
  @Input() commitsData: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  constructor() {}
}
