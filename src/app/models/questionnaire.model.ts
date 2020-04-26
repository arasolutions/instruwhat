
/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class QuestionnaireModel {

  id: number;

  questions: any[];

  nbQuestions: number;

  score: number;

  constructor(id: number, nbQuestions: any) {
    this.id = id;
    this.questions = new Array();
    this.nbQuestions = nbQuestions;
    this.score = 0;
  }

  updateScore() {
    for (let question of this.questions) {
      this.score += question.points;
    }
  }
}
