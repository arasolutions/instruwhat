import { Level } from '../../enums/level.enum'
import { Family, SubFamily } from '../../enums/family.enum'

/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class ModelsInstrumentComponent {

  label: string;

  photo: string;

  level: Level;

  family: Family;

  subFamily: SubFamily;

  constructor() {
    this.label = 'Piano';
    this.level = Level.EASY;
    this.photo = 'assets/instruments/cordes/cordes-frappees/piano/photo.png'
    this.family = Family.CORDES;
    this.subFamily = SubFamily.CORDES_FRAPPEES;
  }
}
