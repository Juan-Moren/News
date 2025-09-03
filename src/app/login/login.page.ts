import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '../shared/services/storage/storage';
import { IUser } from '../interfaces/user.interface';
import { Route, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  public errorMessage: string = "";

  constructor(private readonly storageSrv: Storage,
    private readonly router: Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  public onLogin() {
    this.errorMessage = "";
    const users = this.storageSrv.get<IUser[]>("users") || [];

    const user = users.find(u => u.email == this.email.value);
    if (!user) {
      this.errorMessage = "user does not exist";
      return;
    }

    const encryptedPassword = CryptoJS.SHA256(this.password.value).toString();

    const isValidPassword = user.password === encryptedPassword;
    if (isValidPassword) {
      return this.router.navigate(['/genesis']);
    } else {
      this.errorMessage = "The password is incorrect.";
    }
    throw new Error("Password is incorrect.");
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required,
    Validators.minLength(3),
    ]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    })
  }
}
