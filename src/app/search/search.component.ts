import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from './services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  text: string;
  type: string;
  page: number;

  constructor(private route: ActivatedRoute, public service: SearchService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.text = params.q;
      this.type = params.type;
      this.page = params.page;

      this.service.search(this.text, this.page, this.type);
    });
  }
}
