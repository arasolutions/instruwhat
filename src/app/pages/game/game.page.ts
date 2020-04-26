import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform, NavParams  } from '@ionic/angular';

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

  public files: MediaObject[];
  playing: boolean = false;

  public questionnaire: any;

  public questionsInGame: any[];

  public overlay: boolean;

  public novice: boolean;

  public current: number;

  public initial: boolean;
  public finished: boolean;

  public intervalLoader: any;
  public intervalLoaderIcon: any;
  public loading: number = 0;
  public loaderIcon: string;

  constructor(public router: Router, public navParams: NavParams, private activatedRoute: ActivatedRoute, public media: Media, public platform: Platform, public instrumentService: InstrumentService, public questionService: QuestionService, public questionnaireService: QuestionnaireService) {

    this.questionsInGame = new Array();
    this.files = new Array();
    this.questionnaire = this.questionnaireService.getQuestionnaire();
    console.log(this.questionnaire);

    this.current = 0;

    this.questionsInGame.push(this.questionnaire.questions[this.current]);
    this.load();

    this.novice = true;
  }

  ngOnInit() {

    this.slideOpts = {
      slidesPerView: 1
    };
  }

  ionViewDidEnter() {

    this.initial = true;
    this.finished = false;

    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);

    //Loader
    let icons = ['saxophone', 'clarinette', 'piano', 'tambour', 'triangle', 'trompette', 'xylophone'];
    let currentIcon = 0;
    this.intervalLoaderIcon = setInterval(() => {
      this.loaderIcon = icons[currentIcon % icons.length];
      console.log(this.loaderIcon);

      currentIcon++;
    }, 100);

    this.intervalLoader = setInterval(() => {
      if (this.loading == 3000) {
        clearInterval(this.intervalLoader);
        clearInterval(this.intervalLoaderIcon);
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext();
        this.slides.lockSwipeToNext(true);
        return;
      }
      this.loading += 50;
    }, 50);
  }

  load() {
    const uri = this.questionsInGame[this.current].goodAnswer.sound;
    console.log(uri);

    if (this.platform.is('android')) {
      this.files.push(this.media.create('/android_asset/public/' + uri));
    }
    if (this.platform.is('ios')) {
      this.files.push(this.media.create('/android_asset/public/' + uri));
    }
    this.files[this.files.length - 1].onStatusUpdate.subscribe(status => {
      if (status == 1) {
        // STARTING
      }
      if (status == 2) {
        // RUNNING
        // get current playback position
      }
      if (status == 4) {
        // STOPPING
        this.afterStop(this.files.length - 1);
      }
    }); // fires when files status changes

    this.files[this.files.length - 1].onSuccess.subscribe(() => console.log('Action is successful'));
    this.files[this.files.length - 1].onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); });
    this.percent = 0;

  }

  play(indexFile: number) {
    // play the files
    for (let i = 0; i < this.files.length; i++) {
      this.stop(i);
    }
    this.files[indexFile].play();
    this.playing = true;
    this.questionnaire.questions[indexFile].playing = true;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.files[indexFile].getCurrentPosition().then((position) => {
        this.percent = position / this.files[indexFile].getDuration();
        this.questionnaire.questions[indexFile].percent = this.percent;
      });
    }, 50);
  }

  stop(indexFile: number) {
    this.files[indexFile].stop();
    clearInterval(this.interval);
    this.playing = false;
    this.questionnaire.questions[indexFile].playing = false;
    this.afterStop(indexFile);
  }

  afterStop(indexFile: number) {
    this.percent = 0;
    this.questionnaire.questions[indexFile].percent = 0;
  }

  choose(indexFile: number, question: any, instrumentChosen: any) {
    if (question.state == QuestionState.NOT_PLAYED) {
      this.files[indexFile].pause();
      clearInterval(this.interval);
      this.slides.lockSwipeToNext(false);
      question.clicked = instrumentChosen.id;

      if (question.clicked == question.goodAnswer.id) {
        question.state = QuestionState.GOOD;
        question.points = Math.floor(200 + (800 * (1 - this.percent)));
      } else {
        question.state = QuestionState.BAD;
        question.points = 0;
      }


      // Création de la prochaine slide
      if (this.current < this.questionnaire.nbQuestions - 1) {
        this.questionsInGame.push(this.questionnaire.questions[this.current + 1]);
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
    if (!this.initial) {
      this.slides.lockSwipeToNext(true);
      if (this.current + 1 == this.questionnaire.nbQuestions) {
        this.finished = true;
        this.questionnaire.updateScore();
      } else {
        this.novice = false;
        this.current++;
        this.load();
        setTimeout(() => {
          this.play(this.files.length - 1);
        }, 400);
        if (this.current + 1 < this.questionnaire.nbQuestions) {
          this.slides.getActiveIndex().then(index => {
            this.slides.el.swiper.removeSlide(0);
          });
        }
      }
    } else {
      this.initial = false;
      this.slides.getActiveIndex().then(index => {
        this.slides.el.swiper.removeSlide(0);
      });
    }
  }


  onSlideWillChange() {
    this.stop(this.current);
  }

  restart() {
    this.router.navigate(['/param-game']);
  }
}
