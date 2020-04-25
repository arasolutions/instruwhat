import { Injectable } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionnaireModel } from '../models/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  constructor(public questionService: QuestionService) {

  }

  createQuestionnaire(nbQuestions:number): QuestionnaireModel {
    let result = new QuestionnaireModel(Math.floor(Math.random() * Math.floor(4000)), nbQuestions);

    for (let i = 0; i < nbQuestions; i++) {
      result.questions.push(this.questionService.createQuestion(i));
    }

    return result;
  }

}
