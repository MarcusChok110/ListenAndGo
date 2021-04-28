import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { JwtService } from './jwt.service';
import { ApiHttpService } from './api-http.service';
import { UserCredentials } from '../models/user-credentials.model';
import { User } from '../models/user.model';
import { PlaylistService } from './playlist.service';

@Injectable()
export class UserService {
  private authRoute = 'api/Auth';

  private isLoggedInSubject: ReplaySubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  public user?: User;

  constructor(
    private jwtService: JwtService,
    private apiHttpService: ApiHttpService,
    private playlistService: PlaylistService
  ) {
    this.isLoggedInSubject = new ReplaySubject<boolean>(1);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  populate(): void {
    if (!this.jwtService.getToken()) {
      this.clearSession();
      return;
    }

    this.apiHttpService.get('api/Auth/Ping').subscribe(
      (value) => {
        this.user = value as User;
        this.isLoggedInSubject.next(true);
        this.playlistService.fetchPlaylists(this.user.id);
      },
      (error) => {
        console.log(error);
        this.clearSession();
      }
    );
  }

  register(credentials: UserCredentials): Observable<any> {
    return this.apiHttpService.post(`${this.authRoute}/SignUp`, credentials);
  }

  login(credentials: UserCredentials): Observable<any> {
    return this.apiHttpService.post(`${this.authRoute}/SignIn`, credentials);
  }

  clearSession(): void {
    this.user = undefined;
    this.isLoggedInSubject.next(false);
    this.jwtService.deleteToken();
    this.playlistService.clearPlaylists();
  }
}
