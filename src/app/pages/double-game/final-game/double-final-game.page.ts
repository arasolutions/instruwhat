import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';

import { QuestionnaireService } from '../../../services/questionnaire.service';
import { ScoreService } from '../../../services/score.service';

import { QuestionState } from '../../../enums/question-state.enum';

import { QuestionnaireModel } from '../../../models/questionnaire.model';

@Component({
  selector: 'app-double-final-game',
  templateUrl: './double-final-game.page.html',
  styleUrls: ['./double-final-game.page.scss'],
})
export class DoubleFinalGamePage implements OnInit {

  questionnaires: any[];

  scores: any[2][];

  baseScore: number = 0;

  interval: any;

  public ready: boolean[] = [false, false];

  constructor(
    public router: Router,
    public platform: Platform,
    public route: ActivatedRoute,
    public media: Media,
    public questionnaireService: QuestionnaireService,
    public alertCtrl: AlertController,
    public scoreService: ScoreService) {
    this.questionnaires = <QuestionnaireModel[]>JSON.parse(this.route.snapshot.queryParams.questionnaires);

    this.scores = new Array();

    this.scores[0] = this.questionnaires[0].questions.filter((element: any) => element.state == QuestionState.GOOD);
    this.scores[1] = this.questionnaires[1].questions.filter((element: any) => element.state == QuestionState.GOOD);

    if (this.scores[1].length > this.scores[0].length) {
      this.baseScore = 1;
    }

    console.log(this.scores[1]);


  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.router.navigate(['/param-game']);
    });
  }

  async ionViewWillEnter() {
  }

  restartGame() {
    this.router.navigate(['/double-initial-game'], { queryParams: { form: JSON.stringify(this.questionnaires[0].form) } });
  }

  stopGame() {
    this.router.navigate(['/param-game']);
  }

  checkReady(index: number): void {
    this.ready[index] = true;
    if (this.isAllReady()) {
      this.restartGame();
    }
  }

  isAllReady(): boolean {
    return this.ready[0] && this.ready[1];
  }
}
