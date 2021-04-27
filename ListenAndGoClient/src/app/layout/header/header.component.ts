import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public drawer!: MatSidenav;
  @Input() public isHandset$!: Observable<boolean>;

  public title: string;

  constructor(public userService: UserService, public router: Router) {
    this.title = 'Listen And Go';
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  register(): void {
    this.router.navigateByUrl('/register');
  }

  logout(): void {
    // TODO
    this.router.navigateByUrl('');
  }

  profile(): void {
    this.router.navigateByUrl('/profile');
  }

  ngOnInit(): void {}
}
