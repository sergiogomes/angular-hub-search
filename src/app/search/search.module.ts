import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './';
import { SearchService } from './services';
import { CoreModule } from '../core';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, CoreModule],
  providers: [SearchService],
})
export class SearchModule {}
