import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../../core/services/playlist.service';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistFormComponent } from '../../playlist/playlist-form/playlist-form.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() public routes!: { path: string; title: string; icon: string }[];
  @Input() public isHandset$!: Observable<boolean>;

  constructor(
    public playlistService: PlaylistService,
    public userService: UserService,
    private dialog: MatDialog
  ) {}

  openPlaylistDialog(): void {
    const dialogRef = this.dialog.open(PlaylistFormComponent, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value && this.userService.user?.id) {
        this.playlistService.addPlaylist(this.userService.user?.id, value);
      }
    });
  }
}
