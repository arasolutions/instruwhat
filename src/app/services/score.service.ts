import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

import { Family } from '../enums/family.enum';
import { Level } from '../enums/level.enum';

import { Score } from '../interfaces/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private STORAGE_NAME = 'SCORES';
  private STORAGE_SCORE_NAME = 'SCORE_NAME';

  constructor() {
  }

  async getScores(family: Family, level: Level, nbQuestions: number): Promise<Score[]> {
    await this.initStorage();
    const res = await Storage.get({ key: this.STORAGE_NAME });

    //Filtre
    let result = JSON.parse(res.value).filter((element: any) => element.family.id == family['id'] && element.level.value == level['value'] && element.nbQuestions == nbQuestions);

    result.sort(function(a: any, b: any) {
      return b.score - a.score;
    });

    return result;
  }

  async addScore(name: string, score: number, family: Family, level: Level, nbQuestions: number): Promise<number> {
    await this.initStorage();
    const actualScores = await Storage.get({ key: this.STORAGE_NAME });

    let scores = JSON.parse(actualScores.value);

    let newScore: Score = { id: scores.length + 1, name: name, score: score, family: family, level: level, nbQuestions: nbQuestions, date: new Date() };

    scores.push(newScore);

    await Storage.set({ key: this.STORAGE_NAME, value: JSON.stringify(scores) });
    return newScore.id;
  }

  async getNameScore(): Promise<string> {
    const name = await Storage.get({ key: this.STORAGE_SCORE_NAME });
    return name.value;
  }

  async setNameScore(name: string): Promise<void> {
    return await Storage.set({ key: this.STORAGE_SCORE_NAME, value: name });
  }

  async initStorage(): Promise<boolean> {
    const keys = await Storage.keys();

    if (!keys.keys.includes(this.STORAGE_NAME)) {
      await Storage.set({ key: this.STORAGE_NAME, value: JSON.stringify([]) });
      return true;
    }
  }

}
