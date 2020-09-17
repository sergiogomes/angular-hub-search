import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import {
  LoadingComponent,
  NavbarComponent,
  PaginationComponent,
  RepositoryListComponent,
  UserListComponent,
} from '../components';

@NgModule({
  exports: [
    RepositoryListComponent,
    AngularMaterialModule,
    PaginationComponent,
    UserListComponent,
    HttpClientModule,
    LoadingComponent,
    NavbarComponent,
  ],
  declarations: [
    RepositoryListComponent,
    PaginationComponent,
    UserListComponent,
    LoadingComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  providers: [LoadingComponent],
})
export class CoreModule {}
