import { Level } from '../../enums/level.enum'
import { Family, SubFamily } from '../../enums/family.enum'

/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class ModelsInstrumentComponent {

  id: number;

  label: string;

  photo: string;

  level: Level;

  family: Family;

  subFamily: SubFamily;

  constructor(id: number, label: string, level: Level, photo: string, family: Family, subFamily: SubFamily) {
    this.id = id;
    this.label = label;
    this.level = level;
    this.photo = photo;
    this.family = family;
    this.subFamily = subFamily;
  }
}
