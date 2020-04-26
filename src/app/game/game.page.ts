import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

import { InstrumentService } from '../services/instrument.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QuestionService } from '../services/question.service';

import { QuestionState } from '../enums/question-state.enum'

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

  public nbQuestions: number = 15;
  public current: number;

  public finished: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, public media: Media, public platform: Platform, public instrumentService: InstrumentService, public questionService: QuestionService, public questionnaireService: QuestionnaireService) {
    this.instrumentService.loadInstruments();
    this.questionsInGame = new Array();
    this.files = new Array();
    this.questionnaire = this.questionnaireService.createQuestionnaire(this.nbQuestions);
    this.current = 0;

    this.questionsInGame.push(this.questionnaire.questions[this.current]);
    this.load();

    this.novice = true;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.slideOpts = {
      slidesPerView: 1
    };
  }

  load() {
    const uri = this.questionsInGame[this.current].goodAnswer.sound;

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
    setTimeout(() => {
      this.play(this.files.length - 1);
    }, 600);

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
      question.clicked = instrumentChosen.id;

      if (question.clicked == question.goodAnswer.id) {
        question.state = QuestionState.GOOD;
        question.points = Math.floor(500 + (500 * (1 - this.percent)));
      } else {
        question.state = QuestionState.BAD;
        question.points = 0;
      }


      // Création de la prochaine slide
      if (this.current < this.nbQuestions - 1) {
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
    if (this.current + 1 == this.nbQuestions) {
      console.log("Terminé");
      this.finished = true;
      this.questionnaire.updateScore();
    } else {
      this.novice = false;
      this.current++;
      this.load();
    }
    this.slides.getActiveIndex().then(index => {
      this.slides.el.swiper.removeSlide(0);
      /*if (index > this.maxSlideViewed) {
        while (index != this.maxSlideViewed) {
          this.slides.el.swiper.removeSlide(0);
          index--;
        }
      }
      if (this.slides.el.swiper.slides.length <= 5) {
        console.log("on ajoute des questions")
        this.game.loadQuestions(10);
      }*/
    });
  }

  onSlideWillChange() {
    this.stop(this.current);
  }

}
