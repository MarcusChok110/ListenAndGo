import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { YoutubeQueryResponse } from '../models/youtube-query.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class YoutubeService {
  private readonly apiRoute = 'api/Youtube';
  public searchResults$?: Observable<YoutubeQueryResponse>;
  constructor(private apiHttpService: ApiHttpService) {}

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
}
