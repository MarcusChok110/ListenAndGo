import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../core/models/song.model';
import { Playlist } from '../../core/models/playlist.model';
import { UserService } from '../../core/services/user.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { SongService } from '../../core/services/song.service';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss'],
})
export class PlaylistTableComponent implements OnInit {
  @Input() public playlist?: Playlist;

  constructor(
    private userService: UserService,
    private playlistService: PlaylistService,
    public songService: SongService
  ) {}

  ngOnInit(): void {}

  removeSongFromPlaylist(song: Song): void {
    if (!this.playlist || !this.userService.user) {
      return;
    }

    this.playlistService.removeSongFromPlaylist(
      this.userService.user.id,
      this.playlist,
      song
    );
  }
}
