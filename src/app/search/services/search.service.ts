import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BaseService } from 'src/app/core/services/base.service';
import { QueryParams } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  repositoriesData: any;
  codesData: any;
  commitsData: any;
  issuesData: any;
  topicsData: any;
  usersData: any;
  filter: any;
  defaultResult = {
    total_count: 0,
    incomplete_results: true,
    items: [],
  };

  public searchChanged$: Subject<QueryParams> = new Subject<QueryParams>();
  get eventSearchChanged(): Observable<any> {
    return this.searchChanged$.asObservable();
  }

  constructor(private base: BaseService) {}

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
      },
      (err) => {
        // TODO: explode this error
        console.error(err);
        this.usersData = this.defaultResult;
      }
    );
  }
}