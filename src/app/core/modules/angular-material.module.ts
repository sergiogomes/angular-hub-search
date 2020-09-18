import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class AngularMaterialModule {}
