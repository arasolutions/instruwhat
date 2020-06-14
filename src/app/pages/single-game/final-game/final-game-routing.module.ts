import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalGamePage } from './final-game.page';

const routes: Routes = [
  {
    path: '',
    component: FinalGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalGamePageRoutingModule {}
