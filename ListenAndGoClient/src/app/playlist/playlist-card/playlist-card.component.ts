import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from '../../core/models/playlist.model';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistFormComponent } from '../playlist-form/playlist-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist: Playlist | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEdit(): void {
    const dialogRef = this.dialog.open(PlaylistFormComponent, {
      width: '700px',
      data: this.playlist,
    });

    dialogRef.afterClosed().subscribe((value) => {
      console.log(value);
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: `Are you sure you want to delete "${this.playlist?.name}"?`,
    });

    dialogRef.afterClosed().subscribe((value) => {
      console.log(value);
    });
  }
}
