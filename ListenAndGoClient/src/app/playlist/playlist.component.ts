import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../core/models/playlist.model';
import { PlaylistService } from '../core/services/playlist.service';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private playlistSubscription?: Subscription;
  private playlistSubject: ReplaySubject<Playlist>;
  public playlist$: Observable<Playlist>;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) {
    this.playlistSubject = new ReplaySubject<Playlist>(1);
    this.playlist$ = this.playlistSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playlistId = Number(params.get('playlistId'));

      this.playlistSubscription = this.playlistService.playlists$.subscribe(
        (value) => {
          const filtered = value.filter(
            (playlist) => playlist.id === playlistId
          );

          if (filtered.length > 0) {
            this.playlistSubject.next(filtered[0]);
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.playlistSubscription?.unsubscribe();
  }
}
