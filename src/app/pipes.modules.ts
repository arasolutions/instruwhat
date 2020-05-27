/* pipes.modules.ts */
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ScorePipe } from './pipes/score.pipe';

@NgModule({
  declarations: [ScorePipe],
  imports: [IonicModule],
  exports: [ScorePipe]
})
export class PipesModule {}
