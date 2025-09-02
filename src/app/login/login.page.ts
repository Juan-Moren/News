import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '../shared/services/storage/storage';
import { IUser } from '../interfaces/user.interface';

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

  constructor(private readonly storageSrv: Storage) {
    this.initForm();
  }

  ngOnInit() {
  }

  public onLogin() {
    console.log(this.loginForm.value);
    const users = this.storageSrv.get<IUser[]>("users") || [];
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
