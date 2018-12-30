import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

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
    private fb: FormBuilder,
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

    // TODO: use api to sign-in
  }

}
