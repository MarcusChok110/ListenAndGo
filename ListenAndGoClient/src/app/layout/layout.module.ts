import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule as CDKLayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '../core/core.module';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { PlaylistModule } from '../playlist/playlist.module';
import { FooterComponent } from './footer/footer.component';
import { MatSliderModule } from '@angular/material/slider';
import { FooterQueueComponent } from './footer/footer-queue/footer-queue.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterPlayerComponent } from './footer/footer-player/footer-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    SidenavComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    FooterQueueComponent,
    FooterPlayerComponent,
  ],
  imports: [
    CDKLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    ScrollingModule,
    CoreModule,
    MatMenuModule,
    SharedModule,
    MatSnackBarModule,
    MatDialogModule,
    PlaylistModule,
    MatSliderModule,
    MatTooltipModule,
    DragDropModule,
    YouTubePlayerModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
