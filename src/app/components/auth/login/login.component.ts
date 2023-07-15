import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: any;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get formControl() {
    return this.loginForm.controls;
  }

  initSession() {
    this.auth.login(this.formControl.email.value, this.formControl.password.value);
  }
}
