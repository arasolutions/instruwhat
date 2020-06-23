import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

import { InstrumentService } from '../../services/instrument.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  public icons = ['saxophone', 'clarinette', 'piano', 'tambour', 'triangle', 'trompette', 'xylophone'];

  constructor(public router: Router, public instrumentService: InstrumentService) {
    // Prepare icons
    this.icons.forEach((icon: string) => {
      // Default
      let imgDef = new Image();
      imgDef.src = 'assets/settings/instru-icon/' + icon + '/default.png';
      // Good
      let imgGood = new Image();
      imgGood.src = 'assets/settings/instru-icon/' + icon + '/good.png';
      // Bad
      let imgBad = new Image();
      imgBad.src = 'assets/settings/instru-icon/' + icon + '/bad.png';
    });
  }

  async ionViewWillEnter() {
    let status = await Network.getStatus();
    this.instrumentService.loadInstruments(status.connected);
  }

  ngOnInit() {
  }

  toSoloMode() {
    this.router.navigate(['/param-game']);

  }

  toBattleMode() {
    this.router.navigate(['/double-param-game']);

  }

  toScore() {
    this.router.navigate(['/scores']);

  }

}
