import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialGamePageRoutingModule } from './initial-game-routing.module';

import { InitialGamePage } from './initial-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitialGamePageRoutingModule
  ],
  declarations: [InitialGamePage]
})
export class InitialGamePageModule {}
