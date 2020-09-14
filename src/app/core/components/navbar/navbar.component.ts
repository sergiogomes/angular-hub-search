import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from 'src/app/search/services';
import { QueryParams } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchText: string;

  constructor(private router: Router, private service: SearchService) {}

  ngOnInit(): void {}

  public onSearch(): void {
    const objQueryParams: QueryParams = {
      q: this.searchText,
      page: 1,
      type: 'All',
    };

    this.router.navigate(['/search'], {
      queryParams: objQueryParams,
    });
    this.service.searchChanged$.next(objQueryParams);
  }

  public onKeyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.onSearch();
    }
  }
}
