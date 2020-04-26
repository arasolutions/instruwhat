import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Family } from '../../enums/family.enum';
import { ParamGameForm } from '../../forms/param-game.form';

import { QuestionnaireService } from '../../services/questionnaire.service';
import { InstrumentService } from '../../services/instrument.service';

@Component({
  selector: 'app-param-game',
  templateUrl: './param-game.page.html',
  styleUrls: ['./param-game.page.scss'],
})
export class ParamGamePage implements OnInit {

  families: Family[];

  form: ParamGameForm;

  animate: boolean = false;

  constructor(public router: Router, public questionnaireService: QuestionnaireService, public instrumentService: InstrumentService) {
        this.instrumentService.loadInstruments();

    this.form = new ParamGameForm();

    this.families = new Array();
    this.families.push(Family.ALL);
    this.families.push(Family.BOIS);
    this.families.push(Family.CUIVRES);
    this.families.push(Family.PERCUSSIONS);
    this.families.push(Family.CORDES);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.animate = true;
  }

  goToGame() {

    let questionnaire = this.questionnaireService.createQuestionnaire(this.form);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        questionnaire: questionnaire.id
      }
    };

    this.router.navigate(['/game']);
  }

}
