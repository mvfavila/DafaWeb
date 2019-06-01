import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Token } from "../token";
import { UserApiService } from "../services/user.api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public frm: FormGroup;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;

  public constructor(
    private api: UserApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public ngOnInit() {
    if (this.auth.isSignedIn()) {
      this.router.navigate(["/"]);
    }
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
    const email = this.frm.get("email").value;
    const password = this.frm.get("password").value;

    // Submit request to API
    this.api.signIn(email, password).subscribe(
      (token: Token) => {
        this.auth.doSignIn(token);
        this.router.navigate(["/"]);
      },
      error => {
        this.isBusy = false;
        this.hasFailed = true;
      }
    );
  }
}
