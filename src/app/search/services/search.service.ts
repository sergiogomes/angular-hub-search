import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { BaseService } from 'src/app/core/services/base.service';
import {
  DefaultResult,
  PaginationUpdate,
  QueryParams,
} from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnDestroy {
  repositoriesData: DefaultResult;
  codesData: DefaultResult;
  commitsData: DefaultResult;
  issuesData: DefaultResult;
  topicsData: DefaultResult;
  usersData: DefaultResult;

  public searchChanged$: Subject<QueryParams> = new Subject<QueryParams>();
  get eventSearchChanged(): Observable<any> {
    return this.searchChanged$.asObservable();
  }

  public pagination$: Subject<PaginationUpdate> = new Subject<
    PaginationUpdate
  >();
  get eventChangePagination(): Observable<any> {
    return this.pagination$.asObservable();
  }
  private paginationSub: Subscription;

  constructor(private base: BaseService) {
    this.paginationSub = this.eventChangePagination.subscribe((pageData) => {
      this.search(pageData.text, pageData.pageIndex, pageData.type);
    });
  }

  public search(text: string, page: number, type: string = 'All'): void {
    // if (type === 'Repositories' || type === 'All') {
    //   this.repositoriesData = this.getSearchRepositories(text, page);
    // }

    // if (type === 'Code' || type === 'All') {
    //   this.codesData = this.getSearchCodes(text, page);
    // }

    // if (type === 'Commits' || type === 'All') {
    //   this.commitsData = this.getSearchCommits(text, page);
    // }

    // if (type === 'Issues' || type === 'All') {
    //   this.issuesData = this.getSearchIssues(text, page);
    // }

    // if (type === 'Topics' || type === 'All') {
    //   this.topicsData = this.getSearchTopics(text, page);
    // }

    if (type === 'Users' || type === 'All') {
      this.getSearchUsers(text, page);
    }
  }

  public getSearchRepositories(text: string, page: number): void {}

  public getSearchCodes(text: string, page: number): void {}

  public getSearchCommits(text: string, page: number): void {}

  public getSearchIssues(text: string, page: number): void {}

  public getSearchTopics(text: string, page: number): void {}

  public getSearchUsers(text: string = 'sergiogomes', page: number): void {
    this.base.get(`/search/users?q=${text}&order=asc&page=${page}`).then(
      (resp) => {
        this.usersData = resp;
        this.usersData.page = page;
      },
      (err) => {
        // TODO: explode this error
        console.error(err);
        this.usersData.error = err;
      }
    );
  }

  ngOnDestroy(): void {
    this.paginationSub.unsubscribe();
  }
}
