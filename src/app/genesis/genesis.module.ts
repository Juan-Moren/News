import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenesisPageRoutingModule } from './genesis-routing.module';

import { GenesisPage } from './genesis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenesisPageRoutingModule
  ],
  declarations: [GenesisPage]
})
export class GenesisPageModule {}
