import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoubleFinalGamePageRoutingModule } from './double-final-game-routing.module';

import { DoubleFinalGamePage } from './double-final-game.page';

import { PipesModule } from '../../../pipes.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoubleFinalGamePageRoutingModule,
    PipesModule
  ],
  declarations: [DoubleFinalGamePage]
})
export class DoubleFinalGamePageModule {}
