import { Injectable } from '@angular/core';

import { InstrumentModel } from '../models/instrument.model';
import { Level } from '../enums/level.enum'
import { Family, SubFamily } from '../enums/family.enum'

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  public instruments: InstrumentModel[];

  constructor() { }

  loadInstruments() {
    this.instruments = new Array();

    let piano = new InstrumentModel(1, 'Piano', Level.EASY, 'assets/instruments/cordes/cordes-frappees/piano/piano.mp3', 'assets/instruments/cordes/cordes-frappees/piano/photo.png', Family.CORDES, SubFamily.CORDES_FRAPPEES);
    this.instruments.push(piano);

    let xylophone = new InstrumentModel(2, 'Xylophone', Level.EASY, 'assets/instruments/percussions/sons-determines/xylophone/xylophone.mp3', 'assets/instruments/percussions/sons-determines/xylophone/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_DETERMINE);
    this.instruments.push(xylophone);

    let saxophone = new InstrumentModel(3, 'Saxophone', Level.EASY, 'assets/instruments/bois/anche-simple/saxophone/saxophone.mp3', 'assets/instruments/bois/anche-simple/saxophone/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_SIMPLE);
    this.instruments.push(saxophone);

    let violon = new InstrumentModel(4, 'Violon', Level.EASY, 'assets/instruments/cordes/cordes-pincees/violon/violon.mp3', 'assets/instruments/cordes/cordes-pincees/violon/photo.png', Family.CORDES, SubFamily.CORDES_PINCEES_DOIGTS);
    this.instruments.push(violon);

    let violoncelle = new InstrumentModel(5, 'Violoncelle', Level.EASY, 'assets/instruments/cordes/cordes-pincees/violoncelle/violon.mp3', 'assets/instruments/cordes/cordes-pincees/violoncelle/photo.png', Family.CORDES, SubFamily.CORDES_PINCEES_DOIGTS);
    this.instruments.push(violoncelle);

    let triangle = new InstrumentModel(6, 'Triangle', Level.EASY, 'assets/instruments/percussions/sons-indetermines/triangle/triangle.mp3', 'assets/instruments/percussions/sons-indetermines/triangle/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_INDETERMINE);
    this.instruments.push(triangle);
  }

  getInstrumentById(id: number) {
    return this.instruments.find(element => element.id == id);
  }

}
