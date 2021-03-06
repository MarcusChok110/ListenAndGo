import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist.model';
import { DocumentNode, gql } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Song } from '../models/song.model';

@Injectable()
export class PlaylistService {
  private readonly snackbarDuration = 4000;

  private playlistsSubject: ReplaySubject<Playlist[]>;
  public playlists$: Observable<Playlist[]>;
  private userPlaylistsQuery?: QueryRef<any>;

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.playlistsSubject = new ReplaySubject<Playlist[]>(1);
    this.playlists$ = this.playlistsSubject.asObservable();
  }

  async fetchPlaylists(userId: number, reloadMessage?: string): Promise<void> {
    if (this.userPlaylistsQuery) {
      await this.userPlaylistsQuery.refetch();

      if (reloadMessage) {
        this.snackBar.open(reloadMessage, 'CLOSE', {
          duration: this.snackbarDuration,
          horizontalPosition: 'start',
        });
      }
      return;
    }

    this.userPlaylistsQuery = this.apollo.watchQuery<{ playlists: Playlist[] }>(
      {
        query: GET_USER_PLAYLISTS(userId),
      }
    );

    this.userPlaylistsQuery?.valueChanges.subscribe(({ data }) => {
      this.playlistsSubject.next(data.playlists);
    });
  }

  addPlaylist(userId: number, playlist: Playlist): void {
    this.apollo
      .mutate<any>({
        mutation: ADD_PLAYLIST(userId, playlist),
      })
      .subscribe(({ data }) => {
        if (data.addPlaylist) {
          this.fetchPlaylists(userId, 'Playlist created successfully');
          return;
        }
        this.snackBar.open('Playlist could not be created', 'CLOSE', {
          duration: this.snackbarDuration,
          horizontalPosition: 'start',
        });
      });
  }

  deletePlaylist(userId: number, playlistId: number): void {
    this.apollo
      .mutate<any>({
        mutation: DELETE_PLAYLIST(playlistId),
      })
      .subscribe(({ data }) => {
        if (data.deletePlaylist.success) {
          this.fetchPlaylists(userId, 'Playlist deleted successfully');

          if (this.router.url === `/playlist/${playlistId}`) {
            this.router.navigateByUrl('/');
          }

          return;
        }
        this.snackBar.open('Playlist could not be deleted', 'CLOSE', {
          duration: this.snackbarDuration,
          horizontalPosition: 'start',
        });
      });
  }

  updatePlaylist(userId: number, playlist: Playlist): void {
    this.apollo
      .mutate<any>({
        mutation: UPDATE_PLAYLIST(playlist),
      })
      .subscribe(({ data }) => {
        if (data.updatePlaylist.success) {
          this.fetchPlaylists(userId, 'Playlist updated successfully');
          return;
        }
        this.snackBar.open('Playlist could not be updated', 'CLOSE', {
          duration: this.snackbarDuration,
          horizontalPosition: 'start',
        });
      });
  }

  clearPlaylists(): void {
    this.playlistsSubject.next([]);
    this.userPlaylistsQuery = undefined;
  }

  addSongToPlaylist(userId: number, playlist: Playlist, song: Song): void {
    this.apollo
      .mutate<any>({
        mutation: ADD_SONG_TO_PLAYLIST(playlist, song),
      })
      .subscribe(({ data }) => {
        if (data.addSongToPlaylist.success) {
          this.fetchPlaylists(userId, 'Playlist updated successfully');
          return;
        }
        this.snackBar.open('Song could not be added to playlist', 'CLOSE', {
          duration: this.snackbarDuration,
          horizontalPosition: 'start',
        });
      });
  }

  removeSongFromPlaylist(userId: number, playlist: Playlist, song: Song): void {
    this.apollo
      .mutate<any>({
        mutation: REMOVE_SONG_FROM_PLAYLIST(playlist.id, song.id),
      })
      .subscribe(({ data }) => {
        if (data.removeSongFromPlaylist.success) {
          this.fetchPlaylists(userId, 'Playlist updated successfully');
          return;
        }
        this.snackBar.open('Song could not be removed from playlist', 'CLOSE', {
          duration: this.snackbarDuration,
          horizontalPosition: 'start',
        });
      });
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
          imgUrl
        }
      }
    }
  `;
}

function ADD_PLAYLIST(userId: number, playlist: Playlist): DocumentNode {
  return gql`
  mutation AddPlaylist {
    addPlaylist(input: {
      name: "${playlist.name}"
      description: "${playlist.description}"
      isPublic: ${playlist.isPublic}
      userId: ${userId}
    }) {
      __typename
    }
  }`;
}

function DELETE_PLAYLIST(playlistId: number): DocumentNode {
  return gql`
  mutation DeletePlaylist {
    deletePlaylist(input: {id: ${playlistId}}) {
      success
    }
  }
  `;
}

function UPDATE_PLAYLIST(playlist: Playlist): DocumentNode {
  // for some reason the hours are incremented 4 hours after putting
  // the same value, so decrement it by 4 hours to make sure its the same time
  const date = new Date(playlist.dateCreated);
  date.setHours(date.getHours() - 4);

  return gql`
    mutation UpdatePlaylist {
      updatePlaylist(input: {
        id: ${playlist.id}
        name: "${playlist.name}"
        description: "${playlist.description}"
        dateCreated: "${date.toISOString()}"
        isPublic: ${playlist.isPublic}
        userId: ${playlist.userId}
      }) {
        success
      }
    }
  `;
}

function ADD_SONG_TO_PLAYLIST(playlist: Playlist, song: Song): DocumentNode {
  return gql`
  mutation AddSongToPlaylist {
    addSongToPlaylist(playlistId: ${playlist.id}, songInput: {
      name: "${song.name}"
      artist: "${song.artist}"
      path: "${song.path}"
      type: ${song.type}
      releaseDate: "${song.releaseDate}"
      imgUrl: "${song.imgUrl}"
      userId: ${playlist.userId}
    }) {
      success
    }
  }`;
}

function REMOVE_SONG_FROM_PLAYLIST(
  playlistId: number,
  songId: number
): DocumentNode {
  return gql`
    mutation RemoveSongFromPlaylist {
      removeSongFromPlaylist(playlistId: ${playlistId}, songId: ${songId}) {
        success
      }
    }
  `;
}
