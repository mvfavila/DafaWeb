import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public frm: FormGroup;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public doSignIn() {

    // Make sure form values are valid
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const email = this.frm.get('email').value;
    const password = this.frm.get('password').value;

    // Submit request to API
    this.api
      .signIn(email, password)
      .subscribe((login: Login) => {
        this.auth.doSignIn(login.user.token, login.user.username, login.user.email);
        this.router.navigate(['/']);
      });
  }
}
