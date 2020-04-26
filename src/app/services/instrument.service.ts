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

    let violoncelle = new InstrumentModel(5, 'Violoncelle', Level.EASY, 'assets/instruments/cordes/cordes-pincees/violoncelle/violoncelle.mp3', 'assets/instruments/cordes/cordes-pincees/violoncelle/photo.png', Family.CORDES, SubFamily.CORDES_PINCEES_DOIGTS);
    this.instruments.push(violoncelle);

    let triangle = new InstrumentModel(6, 'Triangle', Level.EASY, 'assets/instruments/percussions/sons-indetermines/triangle/triangle.mp3', 'assets/instruments/percussions/sons-indetermines/triangle/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_NON_DETERMINE);
    this.instruments.push(triangle);

    let violon_alto = new InstrumentModel(7, 'Violon alto', Level.EASY, 'assets/instruments/cordes/cordes-pincees/alto/alto.mp3', 'assets/instruments/cordes/cordes-pincees/alto/photo.png', Family.CORDES, SubFamily.CORDES_PINCEES_DOIGTS);
    this.instruments.push(violon_alto);

    let marimba = new InstrumentModel(8, 'Marimba', Level.INTERMEDIATE, 'assets/instruments/percussions/sons-determines/marimba/marimba.mp3', 'assets/instruments/percussions/sons-determines/marimba/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_DETERMINE);
    this.instruments.push(marimba);

    let djembe = new InstrumentModel(9, 'Djembé', Level.INTERMEDIATE, 'assets/instruments/percussions/sons-indetermines/djembe/djembe.mp3', 'assets/instruments/percussions/sons-indetermines/djembe/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_NON_DETERMINE);
    this.instruments.push(djembe);

    let cajon = new InstrumentModel(10, 'Cajón', Level.INTERMEDIATE, 'assets/instruments/percussions/sons-indetermines/cajon/cajon.mp3', 'assets/instruments/percussions/sons-indetermines/cajon/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_NON_DETERMINE);
    this.instruments.push(cajon);

    let clavecin = new InstrumentModel(11, 'Clavecin', Level.INTERMEDIATE, 'assets/instruments/cordes/cordes-frappees/clavecin/clavecin.mp3', 'assets/instruments/cordes/cordes-frappees/clavecin/photo.png', Family.CORDES, SubFamily.CORDES_FRAPPEES);
    this.instruments.push(clavecin);

    let guitare = new InstrumentModel(12, 'Guitare', Level.EASY, 'assets/instruments/cordes/cordes-pincees/guitare/guitare.mp3', 'assets/instruments/cordes/cordes-pincees/guitare/photo.png', Family.CORDES, SubFamily.CORDES_FRAPPEES);
    this.instruments.push(guitare);

    let guitare_electrique = new InstrumentModel(13, 'Guitare éléctrique', Level.EASY, 'assets/instruments/cordes/cordes-pincees/guitare-electrique/guitare-electrique.mp3', 'assets/instruments/cordes/cordes-pincees/guitare-electrique/photo.png', Family.CORDES, SubFamily.CORDES_FRAPPEES);
    this.instruments.push(guitare_electrique);

    let harpe = new InstrumentModel(14, 'Harpe', Level.EASY, 'assets/instruments/cordes/cordes-pincees/harpe/harpe.mp3', 'assets/instruments/cordes/cordes-pincees/harpe/photo.png', Family.CORDES, SubFamily.CORDES_FRAPPEES);
    this.instruments.push(harpe);
  }

  getInstrumentById(id: number) {
    return this.instruments.find(element => element.id == id);
  }

}
