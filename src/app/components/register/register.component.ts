import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { HttpService } from "../../service/http/http.service";
import { Router } from "@angular/router";
import { UserService } from "../../service/userService/user.service";
import { MatSnackBar } from "@angular/material";
import { ErrorStateMatcher } from "@angular/material/core";

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
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private service: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    // this.register();
  }

  model = {};
  hide = true;

  firstname = new FormControl("", [Validators.required]);
  lastname = new FormControl("", [Validators.required]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl("", [Validators.required]);
  confirmPassword = new FormControl("", Validators.required);

  //To display firstname error message.
  getFirstnameErrorMessage() {
    return this.firstname.hasError("required") ? "Enter first name" : "";
  }

  //To display lastname error message.
  getlastnameErrorMessage() {
    return this.lastname.hasError("requried") ? "Enter last name" : "";
  }

  //To display email error message
  getemailErrorMessage() {
    return this.emailFormControl.hasError("requried") ? "Enter email" : "";
  }

  //To display password error message
  getpasswordErrorMessage() {
    return this.password.hasError("requried") ? "Enter Password" : "";
  }

  //To display confirmPassword error message.
  getconfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError("requried")
      ? "Enter confirm password"
      : "";
  }

  register() {
    var reqbody = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.emailFormControl.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    };
    console.log(reqbody);
    this.userService.register(reqbody).subscribe(
      data => {
        console.log(data);
        //snackbar to show messages.
        this.snackBar.open("Registered successfully!!", "ok", {
          duration: 5000
        });
        this.router.navigate(["login"]);
      },
      err => {
        console.log("err", err);
        this.snackBar.open("Register failed!!", "ok", { duration: 5000 });
      }
    );
  }
  login() {
    this.router.navigate(["login"]);
  }
}
