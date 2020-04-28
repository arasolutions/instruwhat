import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform, NavParams, AlertController } from '@ionic/angular';

import { InstrumentService } from '../../services/instrument.service';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { QuestionService } from '../../services/question.service';

import { QuestionState } from '../../enums/question-state.enum'

@Component({
  selector: 'app-folder',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild('questionSlides', { 'read': null, 'static': false }) slides: any;
  slideOpts: any;

  public folder: string;

  public interval: any;
  public percent: number = 0;

  public file: MediaObject;
  public fileStatus: number;
  playing: boolean = false;

  public questionnaire: any;

  public questionsInGame: any[];

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

  constructor(public router: Router, public navParams: NavParams, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, public media: Media, public platform: Platform, public instrumentService: InstrumentService, public questionService: QuestionService, public questionnaireService: QuestionnaireService) {

    this.questionsInGame = new Array();
    this.questionnaire = this.questionnaireService.getQuestionnaire();
    console.log(this.questionnaire);

    this.current = 0;

    this.questionsInGame.push(this.questionnaire.questions[this.current]);

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

    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);

    const backButtonSub = this.platform.backButton.subscribeWithPriority(10000, () => {
      if (this.fileStatus == 2) {
        // En lecture
        this.file.setVolume(0.0);
      }
      this.askCancel();
    });
  }

  load() {
    const uri = this.questionsInGame[0].goodAnswer.sound;
    if (this.platform.is('android')) {
        this.file = this.media.create('/android_asset/public/' + uri);
    }    else {
      this.file = this.media.create('/android_asset/public/' + uri);
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

    if (!this.questionsInGame[0].clicked) {
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

  choose(question: any, instrumentChosen: any) {
    if (!this.block_action) {
      if (!this.isDisabled(instrumentChosen, question)) {
        if (question.state == QuestionState.NOT_PLAYED) {
          question.clicked = instrumentChosen.id;
          if (this.fileStatus == 2) {
            this.file.pause();
            clearInterval(this.interval);
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
          if (this.current + 1 < this.questionnaire.nbQuestions) {
            this.questionsInGame.push(this.questionnaire.questions[this.current + 1]);
          }

          if (this.current + 1 == this.questionnaire.nbQuestions) {
            this.finished = true;
          }
          this.slides.lockSwipeToNext(false);
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
    this.slides.lockSwipeToNext(true);
    if (!this.finished) {
      if (this.current < this.questionnaire.nbQuestions) {
        this.questionsInGame.shift();
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
    if (this.current + 1 == this.questionnaire.nbQuestions) {
      this.questionnaire.updateScore();
      //Loader
      this.loading = 2000;
      let currentIcon = 0;
      this.intervalLoaderIcon = setInterval(() => {
        this.loaderIcon = this.icons[currentIcon % this.icons.length];
        currentIcon++;
      }, 100);
      this.intervalLoader = setInterval(() => {
        if (this.loading == 0) {
          clearInterval(this.intervalLoader);
          clearInterval(this.intervalLoaderIcon);
          this.router.navigate(['/final-game']);
          return;
        }
        this.loading -= 50;
      }, 50);
    }
    else {
      this.current++;
      this.novice = false;
    }
  }

  isDisabled(instrument: any, question: any) {
    if (!this.questionnaire.help) {
      return false;
    }
    let firstDisabled = (question.state == QuestionState.NOT_PLAYED && this.percent > .5 && this.questionnaire.help && instrument.id == question.helpAnswers[0].id);
    let secondDisabled = (question.state == QuestionState.NOT_PLAYED && this.percent > .8 && this.questionnaire.help && instrument.id == question.helpAnswers[1].id);

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
