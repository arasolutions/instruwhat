import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialGamePage } from './initial-game.page';

const routes: Routes = [
  {
    path: '',
    component: InitialGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialGamePageRoutingModule {}
