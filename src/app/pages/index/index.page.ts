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

  constructor(public router: Router, public instrumentService: InstrumentService) {
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
