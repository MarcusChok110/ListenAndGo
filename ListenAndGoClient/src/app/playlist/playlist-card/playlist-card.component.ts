import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from '../../core/models/playlist.model';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistFormComponent } from '../playlist-form/playlist-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { PlaylistService } from '../../core/services/playlist.service';
import { UserService } from '../../core/services/user.service';
import { SongService } from '../../core/services/song.service';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist: Playlist | null = null;

  constructor(
    private dialog: MatDialog,
    private playlistService: PlaylistService,
    private userService: UserService,
    private songService: SongService
  ) {}

  ngOnInit(): void {}

  onEdit(): void {
    const dialogRef = this.dialog.open(PlaylistFormComponent, {
      width: '700px',
      data: this.playlist,
    });

    dialogRef.afterClosed().subscribe((value) => {
      const userId = this.userService.user?.id;
      if (value && userId) {
        this.playlistService.updatePlaylist(userId, value);
      }
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: `Are you sure you want to delete "${this.playlist?.name}"?`,
    });

    dialogRef.afterClosed().subscribe((value) => {
      const userId = this.userService.user?.id;
      const playlistId = this.playlist?.id;

      if (value && userId && playlistId) {
        this.playlistService.deletePlaylist(userId, playlistId);
      }
    });
  }

  addSongsToQueue(): void {
    if (this.playlist) {
      for (const song of this.playlist.songs) {
        this.songService.addToQueue(song);
      }
    }
  }
}
