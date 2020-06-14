import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoubleParamGamePageRoutingModule } from './double-param-game-routing.module';

import { DoubleParamGamePage } from './double-param-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoubleParamGamePageRoutingModule
  ],
  declarations: [DoubleParamGamePage]
})
export class DoubleParamGamePageModule {}
