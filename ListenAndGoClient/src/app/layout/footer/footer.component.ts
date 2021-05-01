import { Component, OnInit } from '@angular/core';
import { SongService } from '../../core/services/song.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public songService: SongService) {}

  ngOnInit(): void {}

  onTogglePlay(): void {
    this.songService.togglePlaying();
  }
}
