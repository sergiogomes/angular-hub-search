import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './';
import { SearchService } from './services';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule],
  providers: [SearchService],
})
export class SearchModule {}
