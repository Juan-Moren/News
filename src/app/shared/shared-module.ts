import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,],
  exports: [IonicModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent],
})
export class SharedModule { }
