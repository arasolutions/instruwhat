import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoubleGamePage } from './double-game.page';

const routes: Routes = [
  {
    path: '',
    component: DoubleGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubleGamePageRoutingModule {}
