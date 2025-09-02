import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenesisPage } from './genesis.page';

const routes: Routes = [
  {
    path: '',
    component: GenesisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenesisPageRoutingModule {}
