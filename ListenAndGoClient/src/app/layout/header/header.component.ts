import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public drawer!: MatSidenav;
  @Input() public isHandset$!: Observable<boolean>;

  public title: string;

  constructor(
    public userService: UserService,
    public router: Router,
    private snackbarService: MatSnackBar
  ) {
    this.title = 'Listen And Go';
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }

  register(): void {
    this.router.navigateByUrl('/register');
  }

  logout(): void {
    this.userService.clearSession();
    this.snackbarService.open('Logged out successfully', 'Close', {
      duration: 3000,
    });
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {}
}
