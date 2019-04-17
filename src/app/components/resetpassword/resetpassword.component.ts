import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  password = new FormControl('', [
    Validators.required
  ]);
  model = {};
  hide = true;
  login() {
    console.log("helw");
    // console.log(this.password.value, this.emailFormControl.value);
  }
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router) { }


  ngOnInit() {
  }

  loginTo(){
    this.router.navigate(['login']);
  }


}
