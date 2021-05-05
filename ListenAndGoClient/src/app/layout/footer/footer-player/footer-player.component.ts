import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer-player',
  templateUrl: './footer-player.component.html',
  styleUrls: ['./footer-player.component.scss'],
})
export class FooterPlayerComponent implements OnInit, OnDestroy {
  public apiLoaded = false;
  @ViewChild('player') player!: YouTubePlayer;
  public currentSeconds$?: Observable<number>;
  public currentSecondsSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    this.currentSeconds$ = interval(1000).pipe(
      map(() => {
        return this.player.getCurrentTime();
      })
    );
    this.currentSecondsSubscription = this.currentSeconds$?.subscribe(
      console.log
    );
  }

  ngOnDestroy(): void {
    this.currentSecondsSubscription?.unsubscribe();
  }

  play(): void {
    this.player.playVideo();
  }
}
