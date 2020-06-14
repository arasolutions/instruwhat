import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoubleFinalGamePage } from './double-final-game.page';

const routes: Routes = [
  {
    path: '',
    component: DoubleFinalGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubleFinalGamePageRoutingModule {}
