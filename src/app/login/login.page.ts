import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '../shared/services/storage/storage';
import { IUser } from '../interfaces/user.interface';
import { Route, Router } from '@angular/router';

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

  constructor(private readonly storageSrv: Storage,
    private readonly router: Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  public onLogin() {
    console.log(this.loginForm.value);
    const users = this.storageSrv.get<IUser[]>("users") || [];

    const user=users.find(u => u.email == this.email.value);
    if (!user) throw new Error('User does not exist');

    const isValidPassword = user.password == this.password.value;
    if(isValidPassword) return this.router.navigate(['/genesis']);
    throw new Error("Password is incorrect");
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
