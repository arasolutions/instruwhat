import { Injectable } from '@angular/core';

import { QuestionService } from './question.service';
import { InstrumentService } from './instrument.service';

import { QuestionnaireModel } from '../models/questionnaire.model';
import { QuestionModel } from '../models/question.model';

import { ParamGameForm } from '../forms/param-game.form';
import { DoubleParamGameForm } from '../forms/double-param-game.form';

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
      result.questions.push(this.questionService.createQuestion(i, questionnaireInstru[i], form));
    }

    this.questionnaire = result;

    return result;
  }

  createQuestionnaireBattle(form: DoubleParamGameForm): QuestionnaireModel {
    let result = new QuestionnaireModel(Math.floor(Math.random() * Math.floor(4000)), form);

    //let questionnaireInstru = this.instrumentService.getXInstruments(form.nbQuestions);
    let questionnaireInstru = this.instrumentService.getInstrumentsByFilters(form);

    for (let i = 0; i < questionnaireInstru.length; i++) {
      result.questions.push(this.questionService.createQuestion(i, questionnaireInstru[i], form));
    }

    this.questionnaire = result;

    return result;
  }

  cloneQuestionnaire(): QuestionnaireModel {
    let ref = this.getQuestionnaire();
    let result = new QuestionnaireModel(Math.floor(Math.random() * Math.floor(4000)), ref.form);
    ref.questions.forEach((question: QuestionModel, index: number) => {
      let newQuestion = new QuestionModel(index + ref.form.nbQuestions, question.goodAnswer);
      newQuestion.instruments = question.instruments;
      newQuestion.helpAnswers = question.helpAnswers;
      result.questions.push(newQuestion);
    });
    return result;
  }

  getQuestionnaire() {
    return this.questionnaire;
  }
}
