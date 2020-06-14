import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoubleGamePageRoutingModule } from './double-game-routing.module';

import { DoubleGamePage } from './double-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoubleGamePageRoutingModule
  ],
  declarations: [DoubleGamePage]
})
export class DoubleGamePageModule {}
