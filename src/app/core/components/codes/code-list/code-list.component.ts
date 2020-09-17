import { Component, Input } from '@angular/core';
import { DefaultResult } from 'src/app/core/models';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss'],
})
export class CodeListComponent {
  @Input() codesData: DefaultResult;
  @Input() text: string;
  @Input() type: string;

  constructor() {}

  getFileExtension(file: string): string {
    const ext = file.split('.')[1].toUpperCase();
    switch (ext) {
      case 'JS':
        return 'JavaScript';
      case 'MD':
        return 'Markdown';
      default:
        return ext;
    }
  }
}
