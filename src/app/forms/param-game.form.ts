import { Family, SubFamily } from '../enums/family.enum';
/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class ParamGameForm {

  family: Family;

  nbQuestions: number;
  
  help: boolean;

  constructor() {
    this.family = Family.ALL;
    this.nbQuestions = 10;
    this.help = false;
  }
}
