import { Injectable } from '@angular/core';

import { InstrumentService } from './instrument.service';
import { QuestionModel } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(public instrumentService: InstrumentService) {

  }

  createQuestion(id, instrumentChosen:any): QuestionModel {
    const index = Math.floor(Math.random() * Math.floor(this.instrumentService.instruments.length));

    let result = new QuestionModel(id, instrumentChosen);
    result.instruments.push(instrumentChosen);

    //Id possible
    let possiblities = new Array();

    let helpAnswers = new Array();

    for (let instrument of this.instrumentService.instruments) {
      if (instrument.id != instrumentChosen.id) {
        possiblities.push(instrument.id);
      }
    }

    for (let i = 0; i < 3; i++) {
      let ind = Math.floor(Math.random() * Math.floor(possiblities.length));
      let intru = this.instrumentService.getInstrumentById(possiblities[ind]);
      result.instruments.push(intru);
      result.helpAnswers.push(intru);
      possiblities.splice(ind, 1);
    }

    this.randomize(result.instruments);

    this.randomize(result.helpAnswers);
    result.helpAnswers.splice(-1,1);

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
