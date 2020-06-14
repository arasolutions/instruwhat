import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

import { Family } from '../../../enums/family.enum';
import { Level } from '../../../enums/level.enum';
import { DoubleParamGameForm } from '../../../forms/double-param-game.form';

import { AngularFireAnalytics } from '@angular/fire/analytics';

import { QuestionnaireService } from '../../../services/questionnaire.service';
import { InstrumentService } from '../../../services/instrument.service';

@Component({
  selector: 'app-double-param-game',
  templateUrl: './double-param-game.page.html',
  styleUrls: ['./double-param-game.page.scss'],
})
export class DoubleParamGamePage implements OnInit {

  families: Family[];
  levels: Level[];

  form: DoubleParamGameForm;

  animate: boolean = false;

  constructor(public router: Router, public route: ActivatedRoute, public questionnaireService: QuestionnaireService, public instrumentService: InstrumentService, public analytics: AngularFireAnalytics) {

    this.analytics.logEvent('page_view', { page: 'DoubleParamGame' });

    this.form = new DoubleParamGameForm();

    this.families = Family.getAll();

    this.levels = Level.getAll();
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let status = await Network.getStatus();
    this.instrumentService.loadInstruments(status.connected);
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

    this.router.navigate(['/double-initial-game'], navigationExtras);
  }

}
