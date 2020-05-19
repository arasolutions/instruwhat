import { Level } from '../enums/level.enum'
import { Family, SubFamily } from '../enums/family.enum'


export interface Instrument {
  id: number;
  label: string;
  photo: string;
  sound: string;
  level: Level;
  family: Family;
  subFamily: SubFamily;

}
