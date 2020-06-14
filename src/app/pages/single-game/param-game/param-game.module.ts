import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParamGamePageRoutingModule } from './param-game-routing.module';

import { ParamGamePage } from './param-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParamGamePageRoutingModule
  ],
  declarations: [ParamGamePage]
})
export class ParamGamePageModule {}
