import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

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
    private snackbarService: MatSnackBar,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to log out?',
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.userService.clearSession();
        this.snackbarService.open('Logged out successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit(): void {}
}
