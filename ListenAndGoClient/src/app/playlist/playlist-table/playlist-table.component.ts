import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../core/models/song.model';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss'],
})
export class PlaylistTableComponent implements OnInit {
  @Input() public songs?: Song[];

  constructor() {}

  ngOnInit(): void {}
}
