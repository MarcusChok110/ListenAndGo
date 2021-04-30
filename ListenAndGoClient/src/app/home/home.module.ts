import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, CoreModule, YouTubePlayerModule],
})
export class HomeModule {}
