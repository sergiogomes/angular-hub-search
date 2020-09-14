import { Component, Input, OnInit } from '@angular/core';

import { SearchService } from 'src/app/search/services';
import { PaginationUpdate } from '../../models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() total: number;
  @Input() page: number;
  @Input() text: string;
  @Input() type: string;

  constructor(private service: SearchService) {}

  ngOnInit(): void {}

  getUpdate($event): void {
    const pageData = new PaginationUpdate();
    pageData.length = $event.length;
    pageData.pageIndex = $event.pageIndex + 1;
    pageData.pageSize = $event.pageSize;
    pageData.previousPageIndex = $event.previousPageIndex;
    pageData.text = this.text;
    pageData.type = this.type;
    this.service.pagination$.next(pageData);
  }
}
