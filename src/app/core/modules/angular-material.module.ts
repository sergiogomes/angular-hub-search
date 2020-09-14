import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AngularMaterialModule {}
