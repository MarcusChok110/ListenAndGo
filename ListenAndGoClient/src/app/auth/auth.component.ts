import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { UserCredentials } from '../core/models/user-credentials.model';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public authForm: FormGroup;
  public authType: string;
  public title = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private jwtService: JwtService,
    private snackbarService: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // shave off "/" from "/route"
    this.authType = this.router.url.slice(1);

    this.title =
      this.authType === 'register'
        ? 'Register'
        : this.authType === 'login'
        ? 'Log In'
        : '';
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const credentials: UserCredentials = this.authForm.value;

    if (this.authType === 'register') {
      this.userService.register(credentials).subscribe(
        () => {
          const snackbarRef = this.openSnackbar(
            'Account created successfully!',
            'Login'
          );
          snackbarRef
            .onAction()
            .subscribe(() => this.router.navigateByUrl('/login'));
        },
        (error) => {
          this.openSnackbar(error.error.detail);
        }
      );
    } else if (this.authType === 'login') {
      this.userService.login(credentials).subscribe(
        (value) => {
          this.jwtService.setToken(value.jwtToken);
          this.userService.populate();
          this.openSnackbar('Logged in successfully');
          this.router.navigateByUrl('');
        },
        (error) => {
          this.openSnackbar(error.error);
        }
      );
    }
  }

  openSnackbar(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackbarService.open(message, action, {
      duration,
      horizontalPosition: 'start',
    });
  }
}
