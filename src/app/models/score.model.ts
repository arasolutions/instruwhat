import { Level } from '../enums/level.enum'
import { Family, SubFamily } from '../enums/family.enum'

export class ScoreModel {

  private _name: string;

  private _score: number;

  private _date: Date;

  private _family: Family;

  private _level: Level;

  private _nbQuestions: number;

  constructor(name: string, score: number, family: Family, level: Level, nbQuestions: number) {
    this._name = name;
    this._score = score;
    this._family = family;
    this._level = level;
    this._nbQuestions = nbQuestions;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get date(): Date {
    return this._date;
  }

  get family(): Family {
    return this._family;
  }

  set family(value: Family) {
    this._family = value;
  }

  get level(): Level {
    return this._level;
  }

  set level(value: Level) {
    this._level = value;
  }

  get nbQuestions(): number {
    return this._nbQuestions;
  }

  set nbQuestions(value: number) {
    this._nbQuestions = value;
  }
}
