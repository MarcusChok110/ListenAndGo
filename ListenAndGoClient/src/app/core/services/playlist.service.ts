import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist.model';
import { DocumentNode, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class PlaylistService {
  private playlistsSubject: ReplaySubject<Playlist[]>;
  public playlists$: Observable<Playlist[]>;

  constructor(private apollo: Apollo) {
    this.playlistsSubject = new ReplaySubject<Playlist[]>(1);
    this.playlists$ = this.playlistsSubject.asObservable();
  }

  fetchPlaylists(userId: number): void {
    this.apollo
      .query<{ playlists: Playlist[] }>({
        query: GET_USER_PLAYLISTS(userId),
      })
      .subscribe(({ data, loading }) => {
        this.playlistsSubject.next(data.playlists);
      });
  }

  clearPlaylists(): void {
    this.playlistsSubject.next([]);
  }
}

function GET_USER_PLAYLISTS(userId: number): DocumentNode {
  return gql`
    query GetUserPlaylists {
      playlists(where: {userId: {eq: ${userId}}}) {
        id
        name
        description
        dateCreated
        isPublic
        userId
        songs {
          id
          releaseDate
          name
          artist
          type
          path
          userId
        }
      }
    }
  `;
}
