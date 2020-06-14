import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoubleInitialGamePage } from './double-initial-game.page';

const routes: Routes = [
  {
    path: '',
    component: DoubleInitialGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubleInitialGamePageRoutingModule {}
