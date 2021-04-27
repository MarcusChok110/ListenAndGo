import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../../core/services/playlist.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() public routes!: { path: string; title: string }[];
  @Input() public isHandset$!: Observable<boolean>;

  constructor(public playlistService: PlaylistService) {}
}
