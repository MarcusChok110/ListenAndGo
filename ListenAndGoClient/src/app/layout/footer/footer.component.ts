import { Component, OnInit } from '@angular/core';
import { SongService } from '../../core/services/song.service';
import { MatDialog } from '@angular/material/dialog';
import { FooterQueueComponent } from './footer-queue/footer-queue.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public songService: SongService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onTogglePlay(): void {
    this.songService.togglePlaying();
  }

  openQueue(): void {
    this.dialog.open(FooterQueueComponent, { autoFocus: false });
  }
}
