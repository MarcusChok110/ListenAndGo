import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';

@Injectable()
export class SongService {
  public isPlaying: boolean;
  public isLooping: boolean;
  public songQueue: Song[];
  public currentSong?: Song;
  public currentSongIndex?: number;

  constructor() {
    this.isPlaying = false;
    this.isLooping = false;
    this.songQueue = [];
  }

  playSong(song: Song, index: number): void {
    this.currentSong = song;
    this.currentSongIndex = index;
  }

  togglePlaying(): void {
    this.isPlaying = !this.isPlaying;
  }

  toggleLooping(): void {
    this.isLooping = !this.isLooping;
  }

  addToQueue(song: Song): void {
    if (this.queueContains(song)) {
      return;
    }
    this.songQueue.push(song);
  }

  removeFromQueue(song: Song): void {
    this.songQueue = this.songQueue.filter((s) => !this.isEqual(s, song));
  }

  clearQueue(): void {
    this.songQueue = [];
  }

  queueContains(song: Song): boolean {
    for (const s of this.songQueue) {
      if (this.isEqual(song, s)) {
        return true;
      }
    }
    return false;
  }

  isEqual(song1: Song, song2: Song): boolean {
    return (
      song1.name === song2.name &&
      song1.artist === song2.artist &&
      song1.type === song2.type &&
      song1.path === song2.path
    );
  }
}
