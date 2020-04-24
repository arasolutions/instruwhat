import { Injectable } from '@angular/core';

import { ModelsInstrumentComponent } from '../components/models-instrument/models-instrument';
import { Level } from '../enums/level.enum'
import { Family, SubFamily } from '../enums/family.enum'

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  public instruments: ModelsInstrumentComponent[];

  constructor() { }

  loadInstruments() {
    this.instruments = new Array();

    let piano = new ModelsInstrumentComponent(1, 'Piano', Level.EASY, 'assets/instruments/cordes/cordes-frappees/piano/photo.png', Family.CORDES, SubFamily.CORDES_FRAPPEES);
    this.instruments.push(piano);

    let xylophone = new ModelsInstrumentComponent(2, 'Xylophone', Level.EASY, 'assets/instruments/percussions/sons-determines/xylophone/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_DETERMINE);
    this.instruments.push(xylophone);

    let saxophone = new ModelsInstrumentComponent(3, 'Saxophone', Level.EASY, 'assets/instruments/bois/anche-simple/saxophone/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_SIMPLE);
    this.instruments.push(saxophone);

    let violon = new ModelsInstrumentComponent(4, 'Violon', Level.EASY, 'assets/instruments/cordes/cordes-pincees/violon/photo.png', Family.CORDES, SubFamily.CORDES_PINCEES_DOIGTS);
    this.instruments.push(violon);

    //this.randomize(this.instruments);

  }


  randomize(a) {
    let b, c, d;
    c = a.length;
    while (c) {
      b = Math.random() * c-- | 0;
      d = a[c];
      a[c] = a[b];
      a[b] = d;
    }
  }
}
