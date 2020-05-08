import { ParamGameForm } from '../forms/param-game.form';
import { Family } from '../enums/family.enum';
import { Level } from '../enums/level.enum';

/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class QuestionnaireModel {

  id: number;

  form: ParamGameForm;

  help: boolean;

  family: Family;

    level: Level;

  questions: any[];

  nbQuestions: number;

  score: number;

  constructor(id: number, form: ParamGameForm) {
    this.id = id;
    this.form = form;
    this.questions = new Array();
    this.nbQuestions = form.nbQuestions;
    this.help = form.help;
    this.family = form.family;
    this.level = form.level;
    this.score = 0;
  }

  updateScore() {
    for (let question of this.questions) {
      this.score += question.points;
    }
  }
}
