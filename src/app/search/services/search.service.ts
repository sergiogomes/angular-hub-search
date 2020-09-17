import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { BaseService } from 'src/app/core/services/base.service';
import { DefaultResult, PageUpdate, QueryParams } from 'src/app/core/models';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnDestroy {
  repositoriesData = new DefaultResult('Repositories', 'repository');
  codesData = new DefaultResult('Code', 'code');
  commitsData = new DefaultResult('Commits', 'commit');
  issuesData = new DefaultResult('Issues', 'issue');
  discussionsData = new DefaultResult('Discussions', 'discussion');
  packagesData = new DefaultResult('Packages', 'package');
  marketplaceData = new DefaultResult('Marketplace', 'marketplace');
  topicsData = new DefaultResult('Topics', 'topic');
  wikisData = new DefaultResult('Wikis', 'wiki');
  usersData = new DefaultResult('Users', 'user');

  public searchChanged$: Subject<QueryParams> = new Subject<QueryParams>();
  get eventSearchChanged(): Observable<any> {
    return this.searchChanged$.asObservable();
  }

  public pagination$: Subject<PageUpdate> = new Subject<PageUpdate>();
  get eventChangePagination(): Observable<any> {
    return this.pagination$.asObservable();
  }
  private paginationSub: Subscription;

  constructor(private base: BaseService) {}

  public search(text: string, page: number, type: string = 'All'): void {
    if (type === 'Repositories' || type === 'All') {
      this.getSearchRepositories(text, page);
    }

    if (type === 'Code' || type === 'All') {
      this.getSearchCodes(text, page);
    }

    if (type === 'Commits' || type === 'All') {
      this.getSearchCommits(text, page);
    }

    if (type === 'Issues' || type === 'All') {
      this.getSearchIssues(text, page);
    }

    // if (type === 'Topics' || type === 'All') {
    //   this.topicsData = this.getSearchTopics(text, page);
    // }

    if (type === 'Users' || type === 'All') {
      this.getSearchUsers(text, page);
    }
  }

  public getSearchRepositories(text: string, page: number): void {
    this.base.get(`/search/repositories?q=${text}&order=asc&page=${page}`).then(
      (resp) => {
        this.repositoriesData.incomplete_results = resp.incomplete_results;
        this.repositoriesData.total_count = this.limitResults(resp.total_count);
        this.repositoriesData.items = resp.items;
        this.repositoriesData.page = page;
      },
      (err) => {
        // TODO: explode this error
        console.error(err);
        this.repositoriesData.error = err;
      }
    );
  }

  public getSearchCodes(text: string, page: number): void {
    this.base
      .get(
        `/search/code?q=${text}+in%3Afile+user%3Agithub&order=asc&page=${page}`
      )
      .then(
        (resp) => {
          this.codesData.incomplete_results = resp.incomplete_results;
          this.codesData.total_count = this.limitResults(resp.total_count);
          this.codesData.items = resp.items;
          this.codesData.page = page;
        },
        (err) => {
          // TODO: explode this error
          console.error(err);
          this.codesData.error = err;
        }
      );
  }

  public getSearchCommits(text: string, page: number): void {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.cloak-preview+json',
    });
    this.base
      .get(`/search/commits?q=${text}&order=asc&page=${page}`, headers)
      .then(
        (resp) => {
          this.commitsData.incomplete_results = resp.incomplete_results;
          this.commitsData.total_count = this.limitResults(resp.total_count);
          this.commitsData.items = resp.items;
          this.commitsData.page = page;
        },
        (err) => {
          // TODO: explode this error
          console.error(err);
          this.commitsData.error = err;
        }
      );
  }

  public getSearchIssues(text: string, page: number): void {
    this.base.get(`/search/issues?q=${text}&order=asc&page=${page}`).then(
      (resp) => {
        this.issuesData.incomplete_results = resp.incomplete_results;
        this.issuesData.total_count = this.limitResults(resp.total_count);
        this.issuesData.items = resp.items;
        this.issuesData.page = page;
      },
      (err) => {
        // TODO: explode this error
        console.error(err);
        this.issuesData.error = err;
      }
    );
  }

  public getSearchTopics(text: string, page: number): void {}

  public getSearchUsers(text: string = 'sergiogomes', page: number): void {
    this.base.get(`/search/users?q=${text}&order=asc&page=${page}`).then(
      (resp) => {
        this.usersData.incomplete_results = resp.incomplete_results;
        this.usersData.total_count = this.limitResults(resp.total_count);
        this.usersData.items = resp.items;
        this.usersData.page = page;
      },
      (err) => {
        // TODO: explode this error
        console.error(err);
        this.usersData.error = err;
      }
    );
  }

  private limitResults(total: number): number {
    return total > 1000 ? 1000 : total;
  }

  ngOnDestroy(): void {
    this.paginationSub.unsubscribe();
  }
}
