import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import {
  YoutubeItem,
  YoutubeQueryResponse,
} from '../models/youtube-query.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Song } from '../models/song.model';
import { DecodeHTMLPipe } from '../../shared/decode-html.pipe';

@Injectable()
export class YoutubeService {
  private readonly apiRoute = 'api/Youtube';
  public searchResults$?: Observable<YoutubeQueryResponse>;

  constructor(
    private apiHttpService: ApiHttpService,
    private decodeHTMLPipe: DecodeHTMLPipe
  ) {}

  search(query: string): void {
    // params is immutable; either keep it as it is or:
    //    params = params.set(...)
    // or
    //    new HttpParams({ fromString: ...})
    // but the following does not work:
    //    params = new ...
    //    params.set(...) <-- does not change the original params
    const params = new HttpParams().set('query', query);

    this.searchResults$ = this.apiHttpService.get<YoutubeQueryResponse>(
      this.apiRoute,
      params
    );
  }

  itemToSong(item: YoutubeItem): Song {
    return {
      name: this.decodeHTMLPipe.transform(item.snippet.title),
      artist: item.snippet.channelTitle,
      path: item.id.videoId,
      type: 'YOUTUBE',
      releaseDate: item.snippet.publishedAt,
      imgUrl: item.snippet.thumbnails.default.url,
    } as Song;
  }
}
