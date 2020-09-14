import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { NavbarComponent } from '../components';

@NgModule({
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  imports: [CommonModule, FormsModule, AngularMaterialModule],
})
export class CoreModule {}
