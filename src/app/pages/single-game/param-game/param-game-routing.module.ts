import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParamGamePage } from './param-game.page';

const routes: Routes = [
  {
    path: '',
    component: ParamGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamGamePageRoutingModule {}
