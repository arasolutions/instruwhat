import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Family } from '../../enums/family.enum';
import { ParamGameForm } from '../../forms/param-game.form';

import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-initial-game',
  templateUrl: './initial-game.page.html',
  styleUrls: ['./initial-game.page.scss'],
})
export class InitialGamePage implements OnInit {

  public intervalLoader: any;
  public intervalLoaderIcon: any;
  public loading: number;
  public loaderIcon: string;
  public icons = ['saxophone', 'clarinette', 'piano', 'tambour', 'triangle', 'trompette', 'xylophone'];

  constructor(public router: Router, public route: ActivatedRoute, public questionnaireService: QuestionnaireService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let form = <ParamGameForm>JSON.parse(this.route.snapshot.queryParams.form);

    let questionnaire = this.questionnaireService.createQuestionnaire(form);

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
      if (this.loading == 3000) {
        clearInterval(this.intervalLoader);
        clearInterval(this.intervalLoaderIcon);

        this.router.navigate(['/game']);
        return;
      }
      this.loading += 50;
    }, 50);

  }

}
