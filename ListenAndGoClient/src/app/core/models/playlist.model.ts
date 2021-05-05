import { User } from './user.model';
import { Song } from './song.model';

export interface Playlist {
  id: number;
  name: string;
  description: string;
  dateCreated: string;
  isPublic: boolean;
  userId?: number;
  user?: User;
  songs: Song[];
}
