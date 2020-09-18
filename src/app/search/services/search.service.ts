import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

import { BaseService } from 'src/app/core/services/base.service';
import { DefaultResult, PageUpdate, QueryParams } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  repositoriesData = new DefaultResult('Repositories', 'repository');
  discussionsData = new DefaultResult('Discussions', 'discussion');
  marketplaceData = new DefaultResult('Marketplace', 'marketplace');
  packagesData = new DefaultResult('Packages', 'package');
  commitsData = new DefaultResult('Commits', 'commit');
  issuesData = new DefaultResult('Issues', 'issue');
  topicsData = new DefaultResult('Topics', 'topic');
  codesData = new DefaultResult('Code', 'code');
  wikisData = new DefaultResult('Wikis', 'wiki');
  usersData = new DefaultResult('Users', 'user');

  horizontal: MatSnackBarHorizontalPosition = 'end';
  vertical: MatSnackBarVerticalPosition = 'top';

  public searchChanged$: Subject<QueryParams> = new Subject<QueryParams>();
  get eventSearchChanged(): Observable<any> {
    return this.searchChanged$.asObservable();
  }

  public pagination$: Subject<PageUpdate> = new Subject<PageUpdate>();
  get eventChangePagination(): Observable<any> {
    return this.pagination$.asObservable();
  }

  constructor(private base: BaseService, private snackBar: MatSnackBar) {}

  public search(
    text: string,
    page: number,
    type: string = 'All',
    innerWidth: number
  ): void {
    if (innerWidth < 575) {
      this.horizontal = 'center';
      this.vertical = 'bottom';
    }

    switch (type) {
      case 'Repositories':
        this.getSearchRepositories(text, page);
        break;
      case 'Code':
        this.getSearchCodes(text, page);
        break;
      case 'Commits':
        this.getSearchCommits(text, page);
        break;
      case 'Issues':
        this.getSearchIssues(text, page);
        break;
      case 'Topics':
        this.getSearchTopics(text, page);
        break;
      case 'Users':
        this.getSearchUsers(text, page);
        break;
      case 'All':
        this.getSearchRepositories(text, page);
        this.getSearchCodes(text, page);
        this.getSearchCommits(text, page);
        this.getSearchIssues(text, page);
        this.getSearchTopics(text, page);
        this.getSearchUsers(text, page);
        break;
      default:
        break;
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
        this.showError(err.statusText);
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
          this.showError(err.statusText);
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
          this.showError(err.statusText);
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
        this.showError(err.statusText);
        this.issuesData.error = err;
      }
    );
  }

  public getSearchTopics(text: string, page: number): void {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.mercy-preview+json',
    });
    this.base
      .get(`/search/topics?q=${text}&order=asc&page=${page}`, headers)
      .then(
        (resp) => {
          this.topicsData.incomplete_results = resp.incomplete_results;
          this.topicsData.total_count = this.limitResults(resp.total_count);
          this.topicsData.items = resp.items;
          this.topicsData.page = page;
        },
        (err) => {
          this.showError(err.statusText);
          this.topicsData.error = err;
        }
      );
  }

  public getSearchUsers(text: string = 'sergiogomes', page: number): void {
    this.base.get(`/search/users?q=${text}&order=asc&page=${page}`).then(
      (resp) => {
        this.usersData.incomplete_results = resp.incomplete_results;
        this.usersData.total_count = this.limitResults(resp.total_count);
        this.usersData.items = resp.items;
        this.usersData.page = page;
      },
      (err) => {
        this.showError(err.statusText);
        this.usersData.error = err;
      }
    );
  }

  private limitResults(total: number): number {
    return total > 1000 ? 1000 : total;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: this.horizontal,
      verticalPosition: this.vertical,
    });
  }
}
