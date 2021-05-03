import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public apiLoaded = false;
  @ViewChild('player', { static: true }) player!: YouTubePlayer;
  @ViewChild('btn', { static: true }) btn!: HTMLButtonElement;
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
    // this.currentSecondsSubscription = this.currentSeconds$.subscribe(
    //   console.log
    // );
  }

  ngOnDestroy(): void {
    this.currentSecondsSubscription?.unsubscribe();
  }

  play(): void {
    // this.player.nativeElement.playVideo();
    console.log(this.player.playVideo());
  }
}
