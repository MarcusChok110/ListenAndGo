import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }
}
