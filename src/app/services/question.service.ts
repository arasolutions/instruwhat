import { Injectable } from '@angular/core';

import { InstrumentService } from './instrument.service';
import { QuestionModel } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(public instrumentService: InstrumentService) {

  }

  createQuestion(id): QuestionModel {
    const index = Math.floor(Math.random() * Math.floor(4));

    let result = new QuestionModel(id, this.instrumentService.instruments[index]);

    for (let i = 0; i < this.instrumentService.instruments.length; i++) {
      result.instruments.push(this.instrumentService.instruments[i]);
    }

    this.randomize(result.instruments);

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
