import { Family } from '../enums/family.enum';
import { Level } from '../enums/level.enum';

/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class ParamGameForm {

  family: Family;

  level: Level;

  nbQuestions: number;

  help: boolean;

  constructor() {
    this.family = Family.ALL;
    this.level = Level.EASY;
    this.nbQuestions = 10;
    this.help = false;
  }
}
