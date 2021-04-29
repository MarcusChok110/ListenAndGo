import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { AuthGuard } from './core/services/auth.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'playlist/:playlistId',
    component: PlaylistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
