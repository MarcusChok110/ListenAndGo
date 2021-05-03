import { Component, OnInit } from '@angular/core';
import { YoutubeItem } from '../../core/models/youtube-query.model';
import { items } from './mock-search-items.tx';
import { Playlist } from '../../core/models/playlist.model';
import { PlaylistService } from '../../core/services/playlist.service';

@Component({
  selector: 'app-search-soundcloud',
  templateUrl: './search-soundcloud.component.html',
  styleUrls: ['./search-soundcloud.component.scss'],
})
export class SearchSoundcloudComponent implements OnInit {
  public mockItems: YoutubeItem[] = items;

  constructor(public playlistService: PlaylistService) {}

  ngOnInit(): void {}

  onAdd(item: YoutubeItem, playlist: Playlist): void {
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(playlist));
  }
}
