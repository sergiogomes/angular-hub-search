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
  private paginationSub: Subscription;

  constructor(private route: ActivatedRoute, public service: SearchService) {
    this.searchingSub = this.service.eventSearchChanged.subscribe((params) => {
      this.mapAndSearch(params);
    });
    this.paginationSub = this.service.eventChangePagination.subscribe(
      (pageData) => {
        this.page = pageData.pageIndex;
        this.mapAndSearch({
          q: pageData.text,
          page: pageData.pageIndex,
          type: pageData.type,
        });
      }
    );
  }

  ngOnInit(): void {
    this.innerHeight = `max-height: ${window.innerHeight - 166}px`;
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      this.mapAndSearch(params);
    });
  }

  mapAndSearch(params: QueryParams | any): void {
    this.text = params.q;
    this.page = Number(params.page);
    this.type = params.type;
    this.selectedFilter = this.type === 'All' ? 'Repositories' : this.type;

    this.service.search(this.text, this.page, this.type);
    this.updateURL({ q: this.text, page: this.page, type: this.type });
  }

  onSelectType(title): void {
    this.selectedFilter = title;
    const filtered = this.resultFiltered;
    if (filtered.total_count === 0) {
      this.mapAndSearch({ q: this.text, page: filtered.page, type: title });
    } else {
      this.updateURL({ q: this.text, page: filtered.page, type: title });
    }
  }

  updateURL(p: QueryParams): void {
    window.history.replaceState(
      {},
      '',
      `search?q=${p.q}&page=${p.page}&type=${p.type}`
    );
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
    const filterd = this.resultFiltered;
    if (filterd.total_count > 0) {
      return `${filterd.total_count} ${filterd.single} ${
        filterd.total_count === 1 ? 'result' : 'results'
      }`;
    }
    return '';
  }

  get noResults(): string {
    const filterd = this.resultFiltered;
    return `We couldn’t find any ${filterd.single} in the GitHub Searching API matching '${this.text}'.`;
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.searchingSub.unsubscribe();
    this.paginationSub.unsubscribe();
  }
}
