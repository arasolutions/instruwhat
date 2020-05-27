import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalGamePageRoutingModule } from './final-game-routing.module';

import { FinalGamePage } from './final-game.page';

import { PipesModule } from '../../pipes.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalGamePageRoutingModule,
    PipesModule
  ],
  declarations: [FinalGamePage]
})
export class FinalGamePageModule {}
