import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistService {
  // placeholder data for testing
  public items = Array.from({ length: 20 }).map((_, i) => `Item #${i}`);

  constructor() {}
}
