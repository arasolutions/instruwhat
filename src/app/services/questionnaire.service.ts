import { Injectable } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionnaireModel } from '../models/questionnaire.model';

import { ParamGameForm } from '../forms/param-game.form';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  questionnaire: QuestionnaireModel;

  constructor(public questionService: QuestionService) {

  }

  createQuestionnaire(form: ParamGameForm): QuestionnaireModel {
    let result = new QuestionnaireModel(Math.floor(Math.random() * Math.floor(4000)), form);

    for (let i = 0; i < form.nbQuestions; i++) {
      result.questions.push(this.questionService.createQuestion(i));
    }

    this.questionnaire = result;

    return result;
  }

  getQuestionnaire() {
    return this.questionnaire;
  }
}
