import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';

@Injectable()
export class SongService {
  public isPlaying: boolean;
  public isLooping: boolean;
  public songQueue: Song[];
  public currentSong?: Song;

  constructor() {
    this.isPlaying = false;
    this.isLooping = false;
    this.songQueue = [];
  }

  get currentSongIndex(): number | null {
    for (const [i, song] of this.songQueue.entries()) {
      if (song === this.currentSong) {
        return i;
      }
    }
    return null;
  }

  changeSong(song: Song): void {
    this.currentSong = song;
    this.isPlaying = false;
  }

  playSong(song: Song): void {
    this.currentSong = song;
    this.isPlaying = true;
  }

  playNextSong(): void {
    if (this.currentSongIndex == null) {
      return;
    }

    if (this.currentSongIndex < this.songQueue.length - 1) {
      this.currentSong = this.songQueue[this.currentSongIndex + 1];
      this.isPlaying = true;
      return;
    }

    this.currentSong = this.songQueue[0];
    this.isPlaying = false;
  }

  playPreviousSong(): void {
    if (this.currentSongIndex == null) {
      return;
    }

    if (this.currentSongIndex > 0) {
      this.currentSong = this.songQueue[this.currentSongIndex - 1];
      this.isPlaying = true;
      return;
    }

    this.currentSong = this.songQueue[this.songQueue.length - 1];
    this.isPlaying = false;
  }

  playCurrent(): void {
    this.isPlaying = true;
  }

  pauseCurrent(): void {
    this.isPlaying = false;
  }

  clearCurrent(): void {
    this.currentSong = undefined;
    this.isPlaying = false;
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
