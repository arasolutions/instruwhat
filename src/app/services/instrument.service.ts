import { Injectable } from '@angular/core';

import { Instrument } from '../interfaces/instrument';
import { Level } from '../enums/level.enum';
import { Family, SubFamily } from '../enums/family.enum';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import datas from '../../assets/instruments/data.json';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  public instruments: Instrument[];

  private assetsRootDirectory: string = 'assets/instruments/';

  constructor(public afs: AngularFirestore,
    public afStorage: AngularFireStorage) {

  }

  loadInstruments() {
    this.instruments = new Array();

    datas.forEach((element: any, index: number) => {
      let instrument: Instrument = {
        id: index + 1,
        label: element.label,
        level: element.level,
        family: element.family,
        subFamily: element.subFamily,
        photo: this.getPhotoPath(element),
        sound: this.getSoundPath(element)
      };
      this.instruments.push(instrument);
    });
    /*
        let piano: Instrument = { id: 1, label: 'piano', level: Level.EASY, family: Family.CORDES, subFamily: SubFamily.CORDES_FRAPPEES };
        this.instruments.push(piano);

        let xylophone: Instrument = { id: 2, label: 'xylophone', level: Level.EASY, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_DETERMINE };
        this.instruments.push(xylophone);

        let saxophone: Instrument = { id: 3, label: 'saxophone', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_SIMPLE };
        this.instruments.push(saxophone);

        let violon: Instrument = { id: 4, label: 'violon', level: Level.EASY, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(violon);

        let violoncelle: Instrument = { id: 5, label: 'violoncelle', level: Level.EASY, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(violoncelle);

        let triangle: Instrument = { id: 6, label: 'triangle', level: Level.EASY, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(triangle);

        let violon_alto: Instrument = { id: 7, label: 'violon alto', level: Level.INTERMEDIATE, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(violon_alto);

        let marimba: Instrument = { id: 8, label: 'marimba', level: Level.INTERMEDIATE, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_DETERMINE };
        this.instruments.push(marimba);

        let djembe: Instrument = { id: 9, label: 'djembe', level: Level.EASY, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(djembe);

        let cajon: Instrument = { id: 10, label: 'cajón', level: Level.INTERMEDIATE, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(cajon);

        let clavecin: Instrument = { id: 11, label: 'clavecin', level: Level.INTERMEDIATE, family: Family.CORDES, subFamily: SubFamily.CORDES_FRAPPEES };
        this.instruments.push(clavecin);

        let guitare: Instrument = { id: 12, label: 'guitare', level: Level.EASY, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(guitare);

        let guitare_electrique: Instrument = { id: 13, label: 'guitare électrique', level: Level.EASY, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(guitare_electrique);

        let harpe: Instrument = { id: 14, label: 'harpe', level: Level.EASY, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(harpe);

        let basson: Instrument = { id: 15, label: 'basson', level: Level.INTERMEDIATE, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_DOUBLE };
        this.instruments.push(basson);

        let harmonica: Instrument = { id: 16, label: 'harmonica', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_LIBRE };
        this.instruments.push(harmonica);

        let timbales: Instrument = { id: 17, label: 'timbales', level: Level.INTERMEDIATE, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_DETERMINE };
        this.instruments.push(timbales);

        let trombone: Instrument = { id: 18, label: 'trombone', level: Level.INTERMEDIATE, family: Family.CUIVRES, subFamily: null };
        this.instruments.push(trombone);

        let flute_traversiere: Instrument = { id: 19, label: 'flûte traversiere', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_BISEAU };
        this.instruments.push(flute_traversiere);

        let piccolo: Instrument = { id: 20, label: 'piccolo', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_BISEAU };
        this.instruments.push(piccolo);

        let clarinette: Instrument = { id: 21, label: 'clarinette', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_SIMPLE };
        this.instruments.push(clarinette);

        let cornemuse: Instrument = { id: 22, label: 'cornemuse', level: Level.INTERMEDIATE, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_SIMPLE };
        this.instruments.push(cornemuse);

        let hautbois: Instrument = { id: 23, label: 'hautbois', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_DOUBLE };
        this.instruments.push(hautbois);

        let tuba: Instrument = { id: 24, label: 'tuba', level: Level.INTERMEDIATE, family: Family.CUIVRES, subFamily: null };
        this.instruments.push(tuba);

        let claves: Instrument = { id: 25, label: 'claves', level: Level.INTERMEDIATE, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(claves);

        let trompette: Instrument = { id: 26, label: 'trompette', level: Level.EASY, family: Family.CUIVRES, subFamily: null };
        this.instruments.push(trompette);

        let saxo_baryton: Instrument = { id: 27, label: 'saxo baryton', level: Level.INTERMEDIATE, family: Family.BOIS, subFamily: SubFamily.BOIS_ANCHE_SIMPLE };
        this.instruments.push(saxo_baryton);

        let hang: Instrument = { id: 28, label: 'hang', level: Level.EXPERT, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_DETERMINE };
        this.instruments.push(hang);

        let guiro: Instrument = { id: 29, label: 'guiro', level: Level.EXPERT, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(guiro);

        let yukulele: Instrument = { id: 30, label: 'yukulélé', level: Level.INTERMEDIATE, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(yukulele);

        let didgeridoo: Instrument = { id: 31, label: 'didgeridoo', level: Level.EASY, family: Family.CUIVRES, subFamily: null };
        this.instruments.push(didgeridoo);

        let castagnettes: Instrument = { id: 32, label: 'castagnettes', level: Level.INTERMEDIATE, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(castagnettes);

        let flute_de_pan: Instrument = { id: 33, label: 'flûte de pan', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_BISEAU };
        this.instruments.push(flute_de_pan);

        let ocarina: Instrument = { id: 34, label: 'ocarina', level: Level.EXPERT, family: Family.BOIS, subFamily: SubFamily.BOIS_BISEAU };
        this.instruments.push(ocarina);

        let guimbarde: Instrument = { id: 35, label: 'guimbarde', level: Level.EASY, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_DETERMINE };
        this.instruments.push(guimbarde);

        let kazoo: Instrument = { id: 36, label: 'kazoo', level: Level.EASY, family: Family.BOIS, subFamily: SubFamily.BOIS_AUTRE };
        this.instruments.push(kazoo);

        let gong: Instrument = { id: 37, label: 'gong', level: Level.INTERMEDIATE, family: Family.PERCUSSIONS, subFamily: SubFamily.PERCUSSIONS_NON_DETERMINE };
        this.instruments.push(gong);

        let cithare: Instrument = { id: 38, label: 'cithare', level: Level.INTERMEDIATE, family: Family.CORDES, subFamily: SubFamily.CORDES_PINCEES_DOIGTS };
        this.instruments.push(cithare);
    */
    //this.getInstrumentsByFirebase();

    console.log(this.instruments);

  }

  getPhotoPath(instrument: any) {
    let label = instrument.label.replace(/ /g, '-');
    if (instrument.subFamily != null) {
      return this.assetsRootDirectory + instrument.family.directory + '/' + instrument.subFamily.directory + '/' + label + '/photo.png';
    }
    return this.assetsRootDirectory + instrument.family.directory + '/' + label + '/photo.png';
  }

  getSoundPath(instrument: any) {
    let label = instrument.label.replace(/ /g, '-');
    if (instrument.subFamily != null) {
      return this.assetsRootDirectory + instrument.family.directory + '/' + instrument.subFamily.directory + '/' + label + '/' + label + '.mp3';
    }
    return this.assetsRootDirectory + instrument.family.directory + '/' + label + '/' + label + '.mp3';
  }

  getInstruments() {
    return this.instruments;
  }

  getInstrumentById(id: number) {
    return this.instruments.find(element => element.id == id);
  }

  getXInstruments(nbQuestion: number): Instrument[] {
    let result = new Array<Instrument>();
    this.randomize(this.instruments);

    for (let i = 0; i < nbQuestion; i++) {
      result.push(this.instruments[i]);
    }

    return result;
  }

  getInstrumentsByFilters(form): Instrument[] {
    let resultFilter = new Array<Instrument>();
    let resultCount = new Array<Instrument>();
    this.randomize(this.instruments);

    resultFilter = this.instruments.filter(element => (form.family.id === Family.ALL['id'] || element.family['id'] == form.family.id) && element.level['value'] <= form.level.value);

    for (let i = 0; i < form.nbQuestions; i++) {
      resultCount.push(resultFilter[i]);
    }
    return resultCount;
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

  /* Firebase
    getInstrumentsByFirebase : permet de récupérer les instruments depuis Firebase Database
    getPhotoFirebase : permet de récupérer un média depuis Firebase Storage
   */
  /*getInstrumentsByFirebase() {
    let instrusFire = new Array();
    let instrumentsCollection = this.afs.collection<any>('instrument').valueChanges();
    let instrusObs = instrumentsCollection.subscribe(val => {
      val.forEach(function(value) {
        let ins = new Instrument(value.id,
          value.label,
          value.level,
          value.sound,
          value.photo,
          value.family,
          value.subFamily);
        instrusFire.push(ins);
      });
      this.instruments = instrusFire;
    });
  }*/

  async getPhotoFirebase() {
    let urlLink = '';
    const linkPh = 'instrument/bois/anche-double/basson/photo.png';
    try {
      this.afStorage.ref(linkPh).getDownloadURL().subscribe((val) => {
        if (val) {
          console.log('Val OK');
          urlLink = val;
        }
      }, e => {
        //console.log(e);
      });
    } catch (e) {
      //console.log(e);
    }
    return urlLink;
  }


}
