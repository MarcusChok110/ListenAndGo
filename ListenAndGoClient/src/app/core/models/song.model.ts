import { Playlist } from './playlist.model';
import { User } from './user.model';

export interface Song {
  id: number;
  releaseDate: Date;
  name: string;
  artist: string;
  type: SongType;
  path: string;
  playlists: Playlist[];
  userId: number;
  user: User;
}

export type SongType = 'YOUTUBE' | 'SPOTIFY' | 'LOCAL';
