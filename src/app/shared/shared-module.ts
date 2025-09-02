import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { Storage } from './services/storage/storage';

const modules = [
  IonicModule,
  ReactiveFormsModule,
  FormsModule,
];

const components = [
  InputComponent,
  ButtonComponent,
];

@NgModule({
  declarations: [...components],
  providers: [Storage],
  imports: [CommonModule, ...modules],
  exports: [...modules, InputComponent, ButtonComponent,],
})
export class SharedModule { }
