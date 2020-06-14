import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoubleInitialGamePageRoutingModule } from './double-initial-game-routing.module';

import { DoubleInitialGamePage } from './double-initial-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoubleInitialGamePageRoutingModule
  ],
  declarations: [DoubleInitialGamePage]
})
export class DoubleInitialGamePageModule {}
