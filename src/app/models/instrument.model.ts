import { Level } from '../enums/level.enum'
import { Family, SubFamily } from '../enums/family.enum'

/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class InstrumentModel {

  private _id: number;

  private _label: string;

  private _photo: string;

  private _sound: string;

  private _level: Level;

  private _family: Family;

  private _subFamily: SubFamily;

  constructor(id: number, label: string, level: Level, sound: string, photo: string, family: Family, subFamily: SubFamily) {
    this._id = id;
    this._label = label;
    this._level = level;
    this._sound = sound;
    this._photo = photo;
    this._family = family;
    this._subFamily = subFamily;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get photo(): string {
    return this._photo;
  }

  set photo(value: string) {
    this._photo = value;
  }

  get sound(): string {
    return this._sound;
  }

  set sound(value: string) {
    this._sound = value;
  }

  get level(): Level {
    return this._level;
  }
  set level(value: Level) {
    this._level = value;
  }

  get family(): Family {
    return this._family;
  }
  set family(value: Family) {
    this._family = value;
  }

  get subFamily(): SubFamily {
    return this._subFamily;
  }
  set subFamily(value: SubFamily) {
    this._subFamily = value;
  }
}
