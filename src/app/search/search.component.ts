import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryParams } from '../core/models';

import { SearchService } from './services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  text: string;
  type: string;
  page: number;

  private routeParamsSub: Subscription;
  private searchingSub: Subscription;

  constructor(private route: ActivatedRoute, public service: SearchService) {
    this.searchingSub = this.service.eventSearchChanged.subscribe((params) => {
      this.mapAndSearch(params);
    });
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      this.mapAndSearch(params);
    });
  }

  mapAndSearch(params: QueryParams | any): void {
    this.text = params.q;
    this.type = params.type;
    this.page = params.page;

    this.service.search(this.text, this.page, this.type);
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.searchingSub.unsubscribe();
  }

  get resultArray(): Array<any> {
    return [
      this.service.repositoriesData,
      this.service.codesData,
      this.service.commitsData,
      this.service.issuesData,
      this.service.discussionsData,
      this.service.packagesData,
      this.service.marketplaceData,
      this.service.topicsData,
      this.service.wikisData,
      this.service.usersData,
    ];
  }
}
