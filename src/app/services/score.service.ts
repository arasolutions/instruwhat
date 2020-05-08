import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

import { Family } from '../enums/family.enum';
import { Level } from '../enums/level.enum';

import { ScoreModel } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private STORAGE_NAME = 'SCORES';

  constructor() {
    this.initStorage();
  }

  getScores(family: Family, level: Level, nbQuestions: number) {
    let result = new Array<ScoreModel>();

    Storage.get({ key: this.STORAGE_NAME }).then((res: any) => {
      return JSON.parse(res.value);
    });
  }

  async addScore(name: string, score: number, family: Family, level: Level, nbQuestions: number) {
    Storage.get({ key: this.STORAGE_NAME }).then((res: any) => {
      let actualScores = JSON.parse(res.value);
      actualScores.push(new ScoreModel(name, score, family, level, nbQuestions));
      Storage.set(
        {
          key: this.STORAGE_NAME,
          value: JSON.stringify(actualScores)
        });
    });
  }

  async initStorage() {
    await Storage.set(
      {
        key: this.STORAGE_NAME,
        value: JSON.stringify([])
      });
  }
}
