import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../core/services/song.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Song } from '../../../core/models/song.model';

@Component({
  selector: 'app-footer-queue',
  templateUrl: './footer-queue.component.html',
  styleUrls: ['./footer-queue.component.scss'],
})
export class FooterQueueComponent implements OnInit {
  constructor(public songService: SongService) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Song[]>): void {
    moveItemInArray(
      this.songService.songQueue,
      event.previousIndex,
      event.currentIndex
    );
  }

  playSong(song: Song, i: number): void {
    this.songService.playSong(song, i);
  }
}
