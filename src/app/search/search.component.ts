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
  innerHeightStyle = 'max-height: 500px;';
  innerWidth: number;
  mainData: DefaultResult;

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
        if (innerWidth < 575) {
          window.scroll(0, 0);
        }
      }
    );
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight - 166;
    this.innerHeightStyle =
      innerHeight > 575 ? `max-height: ${innerHeight}px` : '';
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      this.mapAndSearch(params);
    });
  }

  mapAndSearch(params: QueryParams | any): void {
    this.text = params.q;
    this.page = Number(params.page);
    this.type = params.type;
    this.selectedFilter = this.type === 'All' ? 'Repositories' : this.type;

    this.service.search(this.text, this.page, this.type, this.innerWidth);
    this.updateURL({ q: this.text, page: this.page, type: this.type });
  }

  onSelectType(title): void {
    this.selectedFilter = title;
    this.mainData = this.resultFiltered;
    if (this.mainData.total_count === 0) {
      this.mapAndSearch({
        q: this.text,
        page: this.mainData.page,
        type: title,
      });
    } else {
      this.updateURL({ q: this.text, page: this.mainData.page, type: title });
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
    this.mainData = this.resultFiltered;
    if (this.mainData.total_count > 0) {
      return `${this.mainData.total_count} ${this.mainData.single} ${
        this.mainData.total_count === 1 ? 'result' : 'results'
      }`;
    }
    return '';
  }

  get noResults(): string {
    this.mainData = this.resultFiltered;
    return `We couldn’t find any ${this.mainData.single} in the GitHub Searching API matching '${this.text}'.`;
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
    this.searchingSub.unsubscribe();
    this.paginationSub.unsubscribe();
  }
}
