import { Component, Input, OnInit } from '@angular/core';
import { YoutubeQueryResponse } from '../../core/models/youtube-query.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-youtube',
  templateUrl: './search-youtube.component.html',
  styleUrls: ['./search-youtube.component.scss'],
})
export class SearchYoutubeComponent implements OnInit {
  @Input() searchResults$?: Observable<YoutubeQueryResponse>;

  constructor() {}

  ngOnInit(): void {}
}
