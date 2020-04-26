import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Family } from '../../enums/family.enum';
import { Level } from '../../enums/level.enum';
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
  levels: Level[];

  form: ParamGameForm;

  animate: boolean = false;

  constructor(public router: Router, public route: ActivatedRoute, public questionnaireService: QuestionnaireService, public instrumentService: InstrumentService) {

    this.instrumentService.loadInstruments();

    this.form = new ParamGameForm();

    this.families = Family.getAll();

    this.levels = Level.getAll();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.animate = true;
  }

  goToGame() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        form: JSON.stringify(this.form)
      }
    };

    this.router.navigate(['/initial-game'], navigationExtras);
  }

}
