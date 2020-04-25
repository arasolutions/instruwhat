import { QuestionState } from '../enums/question-state.enum'

/**
 * Generated class for the ModelsInstrumentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export class QuestionModel {

  id: number;

  instruments: any[];

  goodAnswer: any;

  state: QuestionState;

  clicked: boolean;

  constructor(id: number, goodAnswer: any) {
    this.id = id;
    this.instruments = new Array();
    this.goodAnswer = goodAnswer;
    this.state = QuestionState.NOT_PLAYED;
    this.clicked = false;
  }
}
