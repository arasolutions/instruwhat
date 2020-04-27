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

    let basson = new InstrumentModel(15, 'Basson', Level.INTERMEDIATE, 'assets/instruments/bois/anche-double/basson/basson.mp3', 'assets/instruments/bois/anche-double/basson/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_DOUBLE);
    this.instruments.push(basson);

    let harmonica = new InstrumentModel(16, 'Harmonica', Level.EASY, 'assets/instruments/bois/anche-libre/harmonica/harmonica.mp3', 'assets/instruments/bois/anche-libre/harmonica/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_LIBRE);
    this.instruments.push(harmonica);

    let timbales = new InstrumentModel(17, 'Timbales', Level.INTERMEDIATE, 'assets/instruments/percussions/sons-determines/timbales/timbales.mp3', 'assets/instruments/percussions/sons-determines/timbales/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_DETERMINE);
    this.instruments.push(timbales);

    let trombone = new InstrumentModel(18, 'Trombone', Level.INTERMEDIATE, 'assets/instruments/cuivres/trombone/trombone.mp3', 'assets/instruments/cuivres/trombone/photo.png', Family.CUIVRES, null);
    this.instruments.push(trombone);

    let flute_traversiere = new InstrumentModel(19, 'Flûte traversière ', Level.EASY, 'assets/instruments/bois/biseau/flute-traversiere/flute-traversiere.mp3', 'assets/instruments/bois/biseau/flute-traversiere/photo.png', Family.BOIS, SubFamily.BOIS_BISEAU);
    this.instruments.push(flute_traversiere);

    let piccolo = new InstrumentModel(20, 'Piccolo ', Level.EASY, 'assets/instruments/bois/biseau/piccolo/piccolo.mp3', 'assets/instruments/bois/biseau/piccolo/photo.png', Family.BOIS, SubFamily.BOIS_BISEAU)
    this.instruments.push(piccolo);

    let clarinette = new InstrumentModel(21, 'Clarinette', Level.EASY, 'assets/instruments/bois/anche-simple/clarinette/clarinette.mp3', 'assets/instruments/bois/anche-simple/clarinette/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_SIMPLE);
    this.instruments.push(clarinette);

    let cornemuse = new InstrumentModel(22, 'Cornemuse', Level.INTERMEDIATE, 'assets/instruments/bois/anche-simple/cornemuse/cornemuse.mp3', 'assets/instruments/bois/anche-simple/cornemuse/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_SIMPLE);
    this.instruments.push(cornemuse);

    let hautbois = new InstrumentModel(23, 'Hautbois', Level.EASY, 'assets/instruments/bois/anche-double/hautbois/hautbois.mp3', 'assets/instruments/bois/anche-double/hautbois/photo.png', Family.BOIS, SubFamily.BOIS_ANCHE_DOUBLE);
    this.instruments.push(hautbois);

    let tuba = new InstrumentModel(24, 'Tuba', Level.INTERMEDIATE, 'assets/instruments/cuivres/tuba/tuba.mp3', 'assets/instruments/cuivres/tuba/photo.png', Family.CUIVRES, null);
    this.instruments.push(tuba);

    let claves = new InstrumentModel(25, 'Claves', Level.INTERMEDIATE, 'assets/instruments/percussions/sons-indetermines/claves/claves.mp3', 'assets/instruments/percussions/sons-indetermines/claves/photo.png', Family.PERCUSSIONS, SubFamily.PERCUSSIONS_NON_DETERMINE);
    this.instruments.push(claves);

    let trompette = new InstrumentModel(26, 'Trompette', Level.EASY, 'assets/instruments/cuivres/trompette/trompette.mp3', 'assets/instruments/cuivres/trompette/photo.png', Family.CUIVRES, null);
    this.instruments.push(trompette);
  }

  getInstrumentById(id: number) {
    return this.instruments.find(element => element.id == id);
  }

  getXInstruments(nbQuestion: number): InstrumentModel[] {
    let result = this.instruments;
    this.randomize(result);

    result.splice(-1 * (this.instruments.length - nbQuestion), this.instruments.length - nbQuestion);

    return result;
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
