import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApiHttpService } from './services/api-http.service';
import { PlaylistService } from './services/playlist.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  providers: [
    ApiHttpService,
    JwtService,
    PlaylistService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthGuard,
  ],
})
export class CoreModule {}
