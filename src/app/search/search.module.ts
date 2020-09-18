import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoResultsComponent, ResultSearchComponent } from './components';
import { SearchComponent } from './';
import { SearchService } from './services';
import { CoreModule } from '../core';

@NgModule({
  declarations: [SearchComponent, ResultSearchComponent, NoResultsComponent],
  imports: [CommonModule, CoreModule],
  providers: [SearchService],
})
export class SearchModule {}
