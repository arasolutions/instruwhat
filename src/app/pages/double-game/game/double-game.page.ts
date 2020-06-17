import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform, AlertController } from '@ionic/angular';

import { InstrumentService } from '../../../services/instrument.service';
import { QuestionnaireService } from '../../../services/questionnaire.service';
import { QuestionService } from '../../../services/question.service';

import { QuestionState } from '../../../enums/question-state.enum';

import { QuestionnaireModel } from '../../../models/questionnaire.model';

import { DoubleParamGameForm } from '../../../forms/double-param-game.form';

@Component({
  selector: 'app-folder',
  templateUrl: './double-game.page.html',
  styleUrls: ['./double-game.page.scss'],
})
export class DoubleGamePage implements OnInit {
  @ViewChild('questionSlides1', { 'read': null, 'static': false }) slides1: any;
  @ViewChild('questionSlides2', { 'read': null, 'static': false }) slides2: any;
  slideOpts: any;

  public folder: string;

  public interval: any;
  public percent: number = 0;

  public file: MediaObject;
  public fileStatus: number;
  playing: boolean = false;

  public questionnaires: any[];

  public questionsInGame1: any[];
  public questionsInGame2: any[];

  public overlay: boolean;

  public novice: boolean;

  public current: number;

  public finished: boolean;

  public block_action: boolean;


  public intervalLoader: any;
  public intervalLoaderIcon: any;
  public loading: number;
  public loaderIcon: string;
  public icons = ['saxophone', 'clarinette', 'piano', 'tambour', 'triangle', 'trompette', 'xylophone'];

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, public media: Media, public platform: Platform, public instrumentService: InstrumentService, public questionService: QuestionService, public questionnaireService: QuestionnaireService) {
    let form = <DoubleParamGameForm>JSON.parse(this.activatedRoute.snapshot.queryParams.form);

    this.questionsInGame1 = new Array();
    this.questionsInGame2 = new Array();
    let questionnaire1 = this.questionnaireService.getQuestionnaire();
    let questionnaire2 = this.questionnaireService.cloneQuestionnaire();

    this.questionnaires = new Array(questionnaire1, questionnaire2);

    this.questionnaires[0].icon = this.icons[form.icons[0]];
    this.questionnaires[1].icon = this.icons[form.icons[1]];

    console.log(this.questionnaires);

    this.current = 0;

    this.questionsInGame1.push(this.questionnaires[0].questions[this.current]);
    this.questionsInGame2.push(this.questionnaires[1].questions[this.current]);

    console.log(this.questionsInGame1);
    console.log(this.questionsInGame2);


    this.load();
    setTimeout(() => {
      this.play();
    }, 400);

    this.novice = true;
    this.block_action = false;
  }

  ngOnInit() {
    this.slideOpts = {
      slidesPerView: 1
    };
  }

  async ionViewDidEnter() {
    this.finished = false;

    this.slides1.lockSwipeToPrev(true);
    this.slides1.lockSwipeToNext(true);

    this.slides2.lockSwipeToPrev(true);
    this.slides2.lockSwipeToNext(true);

    const backButtonSub = this.platform.backButton.subscribeWithPriority(10000, () => {
      if (this.fileStatus == 2) {
        // En lecture
        this.file.setVolume(0.0);
      }
      this.askCancel();
    });
  }

  load() {
    const uri = this.questionsInGame1[0].goodAnswer.sound;
    if (uri.indexOf('http') == 0) {
      console.log('Fichier distant');
      console.log(uri);
      this.file = this.media.create(uri);
    } else {
      if (this.platform.is('android')) {
        this.file = this.media.create('/android_asset/public/' + uri);
      } else {
        this.file = this.media.create(uri);
      }
    }
    this.file.onStatusUpdate.subscribe(status => {
      this.fileStatus = status;
      if (status == 4) {
        // STOPPING
        this.afterStop();
      }
    }); // fires when files status changes
    this.file.onSuccess.subscribe(() => {
      this.afterFinished();
    });
    this.file.onError.subscribe(error => {
      console.log('Error! ' + JSON.stringify(error));
    });
    this.percent = 0;
  }

  play() {
    // play the files
    if (this.fileStatus == 2) {
      this.stop();
    }

    if (!this.questionsInGame1[0].clicked && !this.questionsInGame2[0].clicked) {
      this.file.play();
      this.playing = true;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.file.getCurrentPosition().then((position) => {
          this.percent = position / this.file.getDuration();
        });
      }, 50);
    }
  }

  stop() {
    if (this.fileStatus == 2 || this.fileStatus == 3) {
      this.file.stop();
      this.file.release();
    }
    this.playing = false;
    clearInterval(this.interval);
  }

  afterStop() {
    this.percent = 1;
    clearInterval(this.interval);
  }

  afterFinished() {
    this.percent = 1;
    clearInterval(this.interval);
  }

  choose(question: any, questionOther: any, instrumentChosen: any) {
    if (!this.block_action) {
      if (!this.isDisabled(instrumentChosen, question)) {
        // Si <question> a bon, la musique s'arrête, questionOther a toutes ses désactivées, car il n'a pas répondu
        // Si <question> a faux, la musique continue, sa réponse devient BAD, et on attend
        if (questionOther.state == QuestionState.NOT_PLAYED) {
          //1er à jouer
          if (question.state == QuestionState.NOT_PLAYED) {
            question.clicked = instrumentChosen.id;
            if (question.clicked == question.goodAnswer.id) {
              if (this.fileStatus == 2) {
                this.stop();
              }
              question.state = QuestionState.GOOD;
              questionOther.state = QuestionState.BAD;
              question.points = Math.floor(200 + (800 * (1 - this.percent)));

              // Création de la prochaine slide
              if (this.current + 1 < this.questionnaires[0].nbQuestions) {

                this.questionsInGame1.push(this.questionnaires[0].questions[this.current + 1]);
                this.questionsInGame2.push(this.questionnaires[1].questions[this.current + 1]);
              }

              if (this.current + 1 == this.questionnaires[0].nbQuestions) {
                this.finished = true;
              }

              setTimeout(() => {
                this.slides1.lockSwipeToNext(false);
                this.slides2.lockSwipeToNext(false);
                this.slides1.slideNext();
                this.slides2.slideNext();
              }, 2000);
            }
            else {
              question.state = QuestionState.BAD;
              question.points = 0;
            }
          }
        } else {
          if (question.state == QuestionState.NOT_PLAYED) {
            question.clicked = instrumentChosen.id;
            if (this.fileStatus == 2) {
              this.stop();
            }
            if (question.clicked == question.goodAnswer.id) {
              question.state = QuestionState.GOOD;
              question.points = Math.floor(200 + (800 * (1 - this.percent)));
            }
            else {
              question.state = QuestionState.BAD;
              question.points = 0;
            }

            // Création de la prochaine slide
            if (this.current + 1 < this.questionnaires[0].nbQuestions) {
              this.questionsInGame1.push(this.questionnaires[0].questions[this.current + 1]);
              this.questionsInGame2.push(this.questionnaires[1].questions[this.current + 1]);
            }

            if (this.current + 1 == this.questionnaires[0].nbQuestions) {
              this.finished = true;
            }

            setTimeout(() => {
              this.slides1.lockSwipeToNext(false);
              this.slides2.lockSwipeToNext(false);
              this.slides1.slideNext();
              this.slides2.slideNext();
            }, 2000);
          }
        }
      }
    }
  }

  isOverlayHidden(question) {
    return question.state == QuestionState.NOT_PLAYED;
  }

  closeOverlay() {
    this.overlay = true;
  }

  onSlideChange() {

    this.slides1.lockSwipeToNext(true);
    this.slides2.lockSwipeToNext(true);
    if (!this.finished) {
      if (this.current < this.questionnaires[0].nbQuestions) {
        this.questionsInGame1.shift();
        this.questionsInGame2.shift();
      }
      this.load();
      setTimeout(() => {
        this.play();
      }, 400);
    }
    this.block_action = false;
  }

  onSlideWillChange() {
    this.block_action = true;
    this.stop();
    if (this.current + 1 == this.questionnaires[0].nbQuestions) {
      this.questionnaires[0].updateScore();
      //Loader
      this.loading = 0;
      let currentIcon = 0;
      this.loaderIcon = this.icons[currentIcon];
      this.intervalLoaderIcon = setInterval(() => {
        this.loaderIcon = this.icons[currentIcon % this.icons.length];
        currentIcon++;
      }, 100);
      this.intervalLoader = setInterval(() => {
        if (this.loading >= 2000) {
          clearInterval(this.intervalLoader);
          clearInterval(this.intervalLoaderIcon);

          let navigationExtras: NavigationExtras = {
            queryParams: {
              questionnaires: JSON.stringify(this.questionnaires)
            }
          };

          this.router.navigate(['/double-final-game'], navigationExtras);
          return;
        }
        this.loading += 50;
      }, 50);
    }
    else {
      this.current++;
      this.novice = false;
    }
  }

  isDisabled(instrument: any, question: any) {
    if (!this.questionnaires[0].help) {
      return false;
    }
    let firstDisabled = (question.state == QuestionState.NOT_PLAYED && this.percent > .5 && this.questionnaires[0].help && instrument.id == question.helpAnswers[0].id);
    let secondDisabled = (question.state == QuestionState.NOT_PLAYED && this.percent > .8 && this.questionnaires[0].help && instrument.id == question.helpAnswers[1].id);

    /*if (firstDisabled) {
      console.log("First : " + instrument);
    }
    if (secondDisabled) {
      console.log("Second : " + instrument);
    }*/

    return firstDisabled || secondDisabled;
  }

  async askCancel() {
    const alert = await this.alertCtrl.create({
      header: 'Quitter',
      message: 'Tu veux vraiment quitter ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            this.file.setVolume(1.0);
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.stop();
            this.router.navigate(['/param-game']);
          }
        }
      ]
    });
    alert.present();
  }


}
