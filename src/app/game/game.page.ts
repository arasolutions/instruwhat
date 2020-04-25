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
  public playing: boolean = false;

  public file: MediaObject;

  public questionnaire: any;

  public questionsInGame: any[];

  public overlay: boolean;

  public novice: boolean;

  public nbQuestions: number = 15;
  public current: number;

  constructor(private activatedRoute: ActivatedRoute, public media: Media, public platform: Platform, public instrumentService: InstrumentService, public questionService: QuestionService, public questionnaireService: QuestionnaireService) {
    this.instrumentService.loadInstruments();
    this.questionsInGame = new Array();
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
    console.log(uri);

    if (this.platform.is('android')) {
      this.file = this.media.create('/android_asset/public/' + uri);
    }
    if (this.platform.is('ios')) {
      this.file = this.media.create('/android_asset/public/' + uri);
    }
    this.file.onStatusUpdate.subscribe(status => {
      if (status == 1) {
        // STARTING
      }
      if (status == 2) {
        // RUNNING
        // get current playback position
      }
      if (status == 4) {
        // STOPPING
        this.afterStop();
      }
    }); // fires when file status changes

    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); });
    setTimeout(() => {
      this.play();
    }, 600);
  }

  play() {
    console.log("Play");
    // play the file
    this.file.play();
    this.playing = true;
    this.interval = setInterval(() => {
      this.file.getCurrentPosition().then((position) => {
        this.percent = position / this.file.getDuration();
      });
    }, 50);
  }

  stop() {
    console.log("Terminé");
    this.file.stop();
  }

  afterStop() {
    this.percent = 1;
    this.playing = false;
  }

  choose(question: any, instrumentChosen: any) {
    if (question.state == QuestionState.NOT_PLAYED) {
      question.clicked = instrumentChosen.id;

      if (question.clicked == question.goodAnswer.id) {
        question.state = QuestionState.GOOD;
      } else {
        question.state = QuestionState.BAD;
      }

      // Création de la prochaine slide
      if (this.current < this.nbQuestions - 1) {
        this.questionsInGame.push(this.questionnaire.questions[this.current + 1]);
      } else {
        // Génération de la page finale
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
    if (this.current == this.nbQuestions) {
      console.log("Terminé");
    }
    this.novice = false;
    this.current++;
    this.stop();
    this.load();

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

}
