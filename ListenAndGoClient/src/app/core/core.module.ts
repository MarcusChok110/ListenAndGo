import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './services/api.service';
import { PlaylistService } from './services/playlist.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  providers: [
    ApiService,
    JwtService,
    PlaylistService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
})
export class CoreModule {}
