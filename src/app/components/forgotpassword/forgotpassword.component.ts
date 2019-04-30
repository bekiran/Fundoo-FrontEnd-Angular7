import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"]
})
export class ForgotpasswordComponent implements OnInit {
  constructor(private router: Router) {}

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl("", [Validators.required]);

  model = {};
  hide = true;
  forgotpassword() {
    console.log("helw");
    console.log(this.password.value, this.emailFormControl.value);
  }
  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  login() {
    this.router.navigate(["login"]);
  }
}
