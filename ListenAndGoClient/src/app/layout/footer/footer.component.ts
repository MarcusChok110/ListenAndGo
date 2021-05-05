import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../../core/services/song.service';
import { MatDialog } from '@angular/material/dialog';
import { FooterQueueComponent } from './footer-queue/footer-queue.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  @ViewChild('player') player!: YouTubePlayer;

  public songCurrentTime: number | null;
  public songTotalTime: number;
  public videoId: string;
  public apiLoaded: boolean;
  public currentSeconds$?: Observable<number>;
  public currentSecondsSubscription?: Subscription;

  constructor(
    public songService: SongService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.songCurrentTime = 0;
    this.songTotalTime = 0;
    this.videoId = '';
    this.apiLoaded = false;
  }

  onPlay(): void {
    if (!this.songService.currentSong) {
      this.snackbar.open('Please pick a song to play', 'CLOSE', {
        duration: 3000,
        horizontalPosition: 'left',
      });
      return;
    }

    // give time for player to load
    setTimeout(() => {
      this.player.playVideo();

      this.currentSeconds$ = interval(500).pipe(
        map(() => {
          return this.player.getCurrentTime();
        })
      );
      this.currentSecondsSubscription = this.currentSeconds$?.subscribe(
        (value) => {
          this.songCurrentTime = value;
        }
      );
      this.songService.playCurrent();

      // give time for metadata to load before loading duration
      setTimeout(() => {
        this.songTotalTime = this.player.getDuration();
      }, 1000);
    }, 100);
  }

  onPause(): void {
    this.player.pauseVideo();
    this.currentSecondsSubscription?.unsubscribe();
    this.songService.pauseCurrent();
  }

  onClear(): void {
    this.currentSecondsSubscription?.unsubscribe();
    this.songService.clearCurrent();
  }

  onSongEnd(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.ENDED) {
      this.onSkipForwards();
    }
  }

  onSliderChange(change: MatSliderChange): void {
    this.player.seekTo(change.value ?? 0, true);

    if (this.songService.isPlaying) {
      this.onPlay();
    } else {
      this.onPause();
    }
  }

  onSkipForwards(): void {
    this.songService.playNextSong();
    if (this.songService.isPlaying) {
      this.onPlay();
      return;
    }
    this.onPause();
  }

  onSkipBackwards(): void {
    this.songService.playPreviousSong();
    if (this.songService.isPlaying) {
      this.onPlay();
      return;
    }
    this.onPause();
  }

  openQueue(): void {
    const dialogRef = this.dialog.open(FooterQueueComponent, {
      autoFocus: false,
    });
    const subscription = dialogRef.componentInstance.playEvent.subscribe(
      this.onPlay.bind(this)
    );

    dialogRef.afterClosed().subscribe(() => subscription.unsubscribe());
  }

  formatLabel(value: number): string {
    // format seconds into MM:SS
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  loadYouTubeAPI(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  ngOnInit(): void {
    this.loadYouTubeAPI();
  }

  ngOnDestroy(): void {
    this.currentSecondsSubscription?.unsubscribe();
  }
}
