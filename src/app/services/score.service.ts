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
  }

  async getScores(family: Family, level: Level, nbQuestions: number): Promise<ScoreModel[]> {
    await this.initStorage();
    const res = await Storage.get({ key: this.STORAGE_NAME });

    //Filtre
    let result = JSON.parse(res.value).filter(element => element._family.id == family['id'] && element._level.value == level['value'] && element._nbQuestions == nbQuestions);

    console.log(result);
    result.sort(function(a: any, b: any) {
      return b._score - a._score;
    });
    console.log(result);

    return result;
  }

  async addScore(name: string, score: number, family: Family, level: Level, nbQuestions: number): Promise<boolean> {
    await this.initStorage();
    const actualScores = await Storage.get({ key: this.STORAGE_NAME });

    let scores = JSON.parse(actualScores.value);

    scores.push(new ScoreModel(name, score, family, level, nbQuestions));

    await Storage.set({ key: this.STORAGE_NAME, value: JSON.stringify(scores) });
    return true;
  }

  async initStorage(): Promise<boolean> {
    const keys = await Storage.keys();

    if (!keys.keys.includes(this.STORAGE_NAME)) {
      await Storage.set({ key: this.STORAGE_NAME, value: JSON.stringify([]) });
      return true;
    }
  }

}
