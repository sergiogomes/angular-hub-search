import { Component, Input } from '@angular/core';

import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent {
  @Input() topicsData: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  constructor() {}
}
