import { Injectable } from '@angular/core';

@Injectable()
export class SongService {
  public isPlaying: boolean;
  public isLooping: boolean;

  constructor() {
    this.isPlaying = false;
    this.isLooping = false;
  }

  togglePlaying(): void {
    this.isPlaying = !this.isPlaying;
  }

  toggleLooping(): void {
    this.isLooping = !this.isLooping;
  }
}
