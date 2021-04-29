import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [SharedModule, CoreModule],
})
export class SearchModule {}
