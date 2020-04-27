import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalGamePageRoutingModule } from './final-game-routing.module';

import { FinalGamePage } from './final-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalGamePageRoutingModule
  ],
  declarations: [FinalGamePage]
})
export class FinalGamePageModule {}
