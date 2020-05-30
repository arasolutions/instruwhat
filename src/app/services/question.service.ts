import { Injectable } from '@angular/core';

import { InstrumentService } from './instrument.service';
import { QuestionModel } from '../models/question.model';

import { Level } from '../enums/level.enum';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(public instrumentService: InstrumentService) {

  }

  createQuestion(id: number, instrumentChosen: any, form: any): QuestionModel {
    let result = new QuestionModel(id, instrumentChosen);
    result.instruments.push(instrumentChosen);

    //Id possible
    let possibilities = new Array();

    for (let instrument of this.instrumentService.getInstrumentsByFilters(form)) {
      if (instrument.id != instrumentChosen.id) {
        if (!possibilities.includes(instrument.id)) {
          possibilities.push(instrument.id);
        }
      }
    }

    if (form.level.value === Level.INTERMEDIATE['value']) {
      // 1 carte de la même sous famille
      let sameSubFamily = this.instrumentService.getInstrumentsBySubFamily(instrumentChosen.id, instrumentChosen.subFamily, instrumentChosen.family);
      if (sameSubFamily[0]) {
        result.instruments.push(sameSubFamily[0]);
        let index = possibilities.indexOf(sameSubFamily[0].id);
        possibilities.splice(index, 1);
      }
    }

    if (form.level.value === Level.EXPERT['value']) {
      // 2 cartes de la même sous famille
      let sameSubFamily = this.instrumentService.getInstrumentsBySubFamily(instrumentChosen.id, instrumentChosen.subFamily, instrumentChosen.family);
      if (sameSubFamily[0]) {
        result.instruments.push(sameSubFamily[0]);
        let index = possibilities.indexOf(sameSubFamily[0].id);
        console.log(index);
        possibilities.splice(index, 1);
      }

      if (sameSubFamily[1]) {
        result.instruments.push(sameSubFamily[1]);
        let index = possibilities.indexOf(sameSubFamily[1].id);
        possibilities.splice(index, 1);
      }
    }
    console.log(result.instruments.length);
    const nbInstruRestants = 4 - result.instruments.length;

    for (let i = 0; i < nbInstruRestants; i++) {
      let ind = Math.floor(Math.random() * Math.floor(possibilities.length));
      let instru = this.instrumentService.getInstrumentById(possibilities[ind]);
      result.instruments.push(instru);
      result.helpAnswers.push(instru);
      possibilities.splice(ind, 1);
    }

    this.randomize(result.instruments);

    this.randomize(result.helpAnswers);
    result.helpAnswers.splice(-1, 1);

    return result;
  }


  randomize(a) {
    let b, c, d;
    c = a.length;
    while (c) {
      b = Math.random() * c-- | 0;
      d = a[c];
      a[c] = a[b];
      a[b] = d;
    }
  }
}
