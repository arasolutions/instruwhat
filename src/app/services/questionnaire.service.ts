import { Injectable } from '@angular/core';

import { QuestionService } from './question.service';
import { InstrumentService } from './instrument.service';

import { QuestionnaireModel } from '../models/questionnaire.model';

import { ParamGameForm } from '../forms/param-game.form';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  questionnaire: QuestionnaireModel;

  constructor(public questionService: QuestionService, public instrumentService: InstrumentService) {

  }

  createQuestionnaire(form: ParamGameForm): QuestionnaireModel {
    let result = new QuestionnaireModel(Math.floor(Math.random() * Math.floor(4000)), form);

    //let questionnaireInstru = this.instrumentService.getXInstruments(form.nbQuestions);
    let questionnaireInstru = this.instrumentService.getInstrumentsByFilters(form);

    for (let i = 0; i < questionnaireInstru.length; i++) {
      result.questions.push(this.questionService.createQuestion(i, questionnaireInstru[i]));
    }

    this.questionnaire = result;

    return result;
  }

  restartQuestionnaire() {
    this.questionnaire.questions = new Array();

    let questionnaireInstru = this.instrumentService.getXInstruments(this.questionnaire.nbQuestions);

    this.questionnaire.score = 0;
    for (let i = 0; i < questionnaireInstru.length; i++) {
      this.questionnaire.questions.push(this.questionService.createQuestion(i, questionnaireInstru[i]));
    }
  }

  getQuestionnaire() {
    return this.questionnaire;
  }
}
