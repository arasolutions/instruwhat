import { Injectable } from '@angular/core';

import { Family } from '../enums/family.enum';
import { Level } from '../enums/level.enum';

import { ScoreModel } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  getScores(family: Family, level: Level, nbQuestions: number): ScoreModel[] {
    let result = new Array<ScoreModel>();

    for (let i = 10; i >= 0; i--) {
      result.push(new ScoreModel(i, "BOBBY", i * 1450))
    }

    return result;
  }
}
