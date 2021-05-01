import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../core/services/youtube.service';

const YOUTUBE = 0;
const SOUNDCLOUD = 0;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public query: string;
  public selected: number;

  constructor(public youtubeService: YoutubeService) {
    this.query = '';
    this.selected = 0;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    switch (this.selected) {
      case YOUTUBE:
        this.youtubeService.search(this.query);
        break;
      case SOUNDCLOUD:
        console.log(`${this.query} : ${this.selected}`);
        break;
    }
  }

  onReset(): void {
    this.query = '';
  }
}
