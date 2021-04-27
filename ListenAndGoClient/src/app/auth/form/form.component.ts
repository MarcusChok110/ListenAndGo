import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public authForm: FormGroup;
  public authType: string;
  public title = '';

  constructor(private fb: FormBuilder, private router: Router) {
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
    alert(JSON.stringify(this.authForm.value));
  }
}
