import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import {
  LoadingComponent,
  NavbarComponent,
  UserListComponent,
} from '../components';

@NgModule({
  exports: [
    HttpClientModule,
    NavbarComponent,
    LoadingComponent,
    UserListComponent,
  ],
  declarations: [NavbarComponent, LoadingComponent, UserListComponent],
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  providers: [LoadingComponent],
})
export class CoreModule {}
