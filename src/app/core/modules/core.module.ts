import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import {
  CodeListComponent,
  CommitListComponent,
  ErrorComponent,
  IssueListComponent,
  LoadingComponent,
  NavbarComponent,
  PaginationComponent,
  RepositoryListComponent,
  TopicListComponent,
  UserListComponent,
} from '../components';

@NgModule({
  exports: [
    RepositoryListComponent,
    AngularMaterialModule,
    PaginationComponent,
    CommitListComponent,
    TopicListComponent,
    IssueListComponent,
    CodeListComponent,
    UserListComponent,
    HttpClientModule,
    LoadingComponent,
    NavbarComponent,
    ErrorComponent,
  ],
  declarations: [
    RepositoryListComponent,
    PaginationComponent,
    CommitListComponent,
    TopicListComponent,
    IssueListComponent,
    CodeListComponent,
    UserListComponent,
    LoadingComponent,
    NavbarComponent,
    ErrorComponent,
  ],
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  providers: [LoadingComponent],
})
export class CoreModule {}
