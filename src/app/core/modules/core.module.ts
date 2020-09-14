import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import { LoadingComponent, NavbarComponent } from '../components';

@NgModule({
  exports: [NavbarComponent, LoadingComponent, HttpClientModule],
  declarations: [NavbarComponent, LoadingComponent],
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  providers: [LoadingComponent],
})
export class CoreModule {}
