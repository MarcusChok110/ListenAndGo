import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { PlaylistComponent } from './playlist.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PlaylistTableComponent } from './playlist-table/playlist-table.component';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    PlaylistComponent,
    PlaylistTableComponent,
    PlaylistFormComponent,
    PlaylistCardComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    ScrollingModule,
  ],
  exports: [PlaylistComponent, PlaylistFormComponent],
})
export class PlaylistModule {}
