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

    console.log(questionnaire);


    //Loader
    this.loading = 0;
    let currentIcon = 0;
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
