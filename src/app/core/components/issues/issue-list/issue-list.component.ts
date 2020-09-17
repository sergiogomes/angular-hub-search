import { Component, Input } from '@angular/core';
import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent {
  @Input() issuesData: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  private pattern = 'https://api.github.com/repos/';

  constructor() {}

  manageRepoUrl(url: string): string {
    let repoName = url;
    if (url.indexOf(this.pattern) > -1) {
      repoName = url.replace(this.pattern, '');
    }
    return repoName;
  }
}
