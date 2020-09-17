import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DefaultResult, QueryParams } from '../core/models';

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
  selectedFilter: string;
  innerHeight = 'max-height: 500px;';

  private routeParamsSub: Subscription;
  private searchingSub: Subscription;

  constructor(private route: ActivatedRoute, public service: SearchService) {
    this.searchingSub = this.service.eventSearchChanged.subscribe((params) => {
      this.mapAndSearch(params);
    });
  }

  ngOnInit(): void {
    this.innerHeight = `max-height: ${window.innerHeight - 166}px`;
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      this.mapAndSearch(params);
    });
  }

  mapAndSearch(params: QueryParams | any): void {
    this.text = params.q;
    this.page = params.page;
    this.type = params.type;
    this.selectedFilter = this.type === 'All' ? 'Repositories' : this.type;

    this.service.search(this.text, this.page, this.type);
  }

  onSelectType(title): void {
    this.selectedFilter = title;
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

  get resultFiltered(): DefaultResult {
    return this.resultArray.filter((option) => {
      return option.title === this.selectedFilter;
    })[0];
  }

  get resultTitle(): string {
    return `${this.resultFiltered.total_count} ${this.resultFiltered.single} ${
      this.resultFiltered.total_count > 1 ? 'results' : 'result'
    }`;
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.searchingSub.unsubscribe();
  }
}
