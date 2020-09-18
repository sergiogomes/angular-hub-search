import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from 'src/app/search/services';
import { QueryParams } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchText: string;

  private routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SearchService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      this.searchText = params.q ? params.q : this.searchText;
    });
  }

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

  public onClickHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }
}
