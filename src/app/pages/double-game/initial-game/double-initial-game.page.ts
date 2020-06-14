import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { DoubleParamGameForm } from '../../../forms/double-param-game.form';

import { QuestionnaireService } from '../../../services/questionnaire.service';

@Component({
  selector: 'app-double-initial-game',
  templateUrl: './double-initial-game.page.html',
  styleUrls: ['./double-initial-game.page.scss'],
})
export class DoubleInitialGamePage implements OnInit {

  public intervalLoader: any;
  public intervalLoaderIcon: any;
  public loading: number;
  public loaderIcon: string;
  public icons = ['saxophone', 'clarinette', 'piano', 'tambour', 'triangle', 'trompette', 'xylophone'];

  public form: DoubleParamGameForm;

  public ready: boolean[] = [false, false];

  constructor(public router: Router, public route: ActivatedRoute, public questionnaireService: QuestionnaireService) {
    this.form = <DoubleParamGameForm>JSON.parse(this.route.snapshot.queryParams.form);
    this.ready= [false, false];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.form = <DoubleParamGameForm>JSON.parse(this.route.snapshot.queryParams.form);
    this.ready= [false, false];
  }

  chooseAvatar(index: number, icon: number): void {
    this.form.icons[index] = icon;
  }

  checkReady(index: number): void {
    this.ready[index] = true;
    if (this.isAllReady()) {

      let questionnaire = this.questionnaireService.createQuestionnaireBattle(this.form);

      let preloadArray: any[] = new Array();
      questionnaire.questions.forEach((question: any) => {
        question.instruments.forEach((instrument: any) => {
          if (instrument.sound.indexOf('http') == 0) {
            if (preloadArray.find(sound => (sound == instrument.sound)) === undefined) {
              preloadArray.push(instrument.sound);
              console.log('Preload ' + instrument.sound);
              let preloadSound = new Audio();
              preloadSound.src = instrument.sound;
            } else {
              console.log('Déjà chargé : ' + instrument.sound);
            }
          }
          if (instrument.photo.indexOf('http') == 0) {
            if (preloadArray.find(photo => (photo == instrument.photo)) === undefined) {
              preloadArray.push(instrument.photo);
              console.log('Preload ' + instrument.photo);
              let preloadPhoto = new Image();
              preloadPhoto.src = instrument.photo;
            } else {
              console.log('Déjà chargé : ' + instrument.photo);
            }
          }
        });
      });

      //Loader
      this.loading = 0;
      let currentIcon = 0;
      this.loaderIcon = this.icons[0];
      this.intervalLoaderIcon = setInterval(() => {
        this.loaderIcon = this.icons[currentIcon % this.icons.length];
        currentIcon++;
      }, 100);

      this.intervalLoader = setInterval(() => {
        if (this.loading >= 3000) {
          clearInterval(this.intervalLoader);
          clearInterval(this.intervalLoaderIcon);

            let navigationExtras: NavigationExtras = {
              queryParams: {
                form: JSON.stringify(this.form)
              }
            };

          this.router.navigate(['/double-game'], navigationExtras);
          return;
        }
        this.loading += 50;
      }, 50);
    }
  }

  isAllReady(): boolean {
    return this.ready[0] && this.ready[1];
  }

  async askCancel() {
    this.router.navigate(['/double-param-game']);
  }
}
