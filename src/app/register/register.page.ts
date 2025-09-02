import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Storage  } from 'src/app/shared/services/storage/storage';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public registerForm!: FormGroup;

  constructor(private readonly storageSrv: Storage, private readonly router: Router) {
    this.initForm();}

  ngOnInit() {
  }

  public doRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      let users = this.storageSrv.get<IUser[]>("users");
      if(!users) {
        users = [];
      }

      const exists = users.find(user => user.email == this.email.value);
      if(exists) throw new Error('That email is already in use');

      users.push(this.registerForm.value);

      this.storageSrv.set('users', users);
      this.registerForm.reset();
      this.router.navigate(['/login']);

    } else {
      console.log('Invalid form');
      this.registerForm.markAllAsTouched();
    }
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, {validators: this.passwordMatchValidator});
  }

  private passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

}
