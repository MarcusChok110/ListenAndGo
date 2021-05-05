import { Component, OnInit } from '@angular/core';
import { YoutubeItem } from '../../core/models/youtube-query.model';
import { YoutubeService } from '../../core/services/youtube.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DecodeHTMLPipe } from '../../shared/decode-html.pipe';
import { SongService } from '../../core/services/song.service';
import { Playlist } from '../../core/models/playlist.model';

@Component({
  selector: 'app-search-youtube',
  templateUrl: './search-youtube.component.html',
  styleUrls: ['./search-youtube.component.scss'],
})
export class SearchYoutubeComponent implements OnInit {
  constructor(
    public youtubeService: YoutubeService,
    public playlistService: PlaylistService,
    public userService: UserService,
    private snackbar: MatSnackBar,
    private decodeHTMLPipe: DecodeHTMLPipe,
    private songService: SongService
  ) {}

  ngOnInit(): void {}

  onAdd(item: YoutubeItem, playlist: Playlist): void {
    if (this.userService.user) {
      this.playlistService.addSongToPlaylist(
        this.userService.user.id,
        playlist,
        this.youtubeService.itemToSong(item)
      );
    }
  }

  onLoggedOutClick(): void {
    this.snackbar.open('You must be logged in to use this feature', 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'start',
    });
  }

  onAddSongToQueue(item: YoutubeItem): void {
    this.songService.addToQueue(this.youtubeService.itemToSong(item));
  }
}
