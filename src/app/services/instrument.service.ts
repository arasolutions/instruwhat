import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Network, Storage } = Plugins;

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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
    public afStorage: AngularFireStorage,
    private http: HttpClient) {
  }

  async loadInstruments(online: boolean = false) {
    this.instruments = new Array();
    if (online) {
      // Si connecté, on peut récupérer les URLS
      datas.forEach(async (element: any, index: number) => {
        for (let indexSound = 1; indexSound <= element.sounds; indexSound++) {
          for (let indexPhoto = 1; indexPhoto <= element.photos; indexPhoto++) {
            let instrument: Instrument = {
              id: index + 1,
              label: element.label,
              level: element.level,
              family: element.family,
              subFamily: element.subFamily,
              photo: this.getPhotoPath(element, indexPhoto),
              sound: await this.getSoundPath(element, indexSound)
            };
            this.instruments.push(instrument);
          }
        }
      });
    } else {
      // Si déconnecté, seulement les assets locales
      datas.forEach(async (element: any, index: number) => {
        let instrument: Instrument = {
          id: index + 1,
          label: element.label,
          level: element.level,
          family: element.family,
          subFamily: element.subFamily,
          photo: this.getPhotoPath(element, 1),
          sound: await this.getSoundPath(element, 1)
        };
        this.instruments.push(instrument);
      });
    }

    //this.getInstrumentsByFirebase();

    console.log(this.instruments);
  }

  getPhotoPath(instrument: any, index: number) {
    let label = instrument.label.replace(/ /g, '-');
    if (index > 1) {
      return 'https://demo.ara-solutions.com/instruwhat/' + label + index + '.png';
    }
    if (instrument.subFamily != null) {
      return this.assetsRootDirectory + instrument.family.directory + '/' + instrument.subFamily.directory + '/' + label + '/' + label + index + '.png';
    }
    return this.assetsRootDirectory + instrument.family.directory + '/' + label + '/' + label + index + '.png';
  }

  async getSoundPath(instrument: any, index: number) {
    let label = instrument.label.replace(/ /g, '-');
    if (index > 1) {
      return 'https://demo.ara-solutions.com/instruwhat/' + label + index + '.mp3';
    }
    if (instrument.subFamily != null) {
      return this.assetsRootDirectory + instrument.family.directory + '/' + instrument.subFamily.directory + '/' + label + '/' + label + index + '.mp3';
    }
    return this.assetsRootDirectory + instrument.family.directory + '/' + label + '/' + label + index + '.mp3';
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

  getInstrumentsByFilters(form: any): Instrument[] {
    let resultFilter = new Array<Instrument>();
    let resultCount = new Array<Instrument>();
    this.randomize(this.instruments);

    resultFilter = this.instruments.filter(element => (form.family.id === Family.ALL['id'] || element.family['id'] == form.family.id) && element.level['value'] <= form.level.value);

    let i = 0;
    while (resultCount.length < form.nbQuestions) {
      if (resultCount.find(instru => (instru.sound == resultFilter[i].sound)) === undefined) {
        resultCount.push(resultFilter[i]);
      } else {
        console.log('On ne prends pas. Doublon de ' + resultFilter[i].sound);
      }
      i++;
    }

    return resultCount;
  }

  getInstrumentsBySubFamily(idInstru: number, subFamily: SubFamily, family: Family): Instrument[] {
    let resultFilter = new Array<Instrument>();
    let resultCount = new Array<Instrument>();

    if (subFamily == null) {
      resultFilter = this.instruments.filter(element => (element.id != idInstru && element.family['id'] === family['id']));
    } else {
      resultFilter = this.instruments.filter(element => (element.id != idInstru && element.subFamily != null && element.subFamily['id'] === subFamily['id']));
    }
    this.randomize(resultFilter);

    let i = 0;
    while (resultCount.length < 4) {
      if (resultFilter[i]) {
        if (resultCount.find(instru => (instru.id == resultFilter[i].id)) === undefined) {
          resultCount.push(resultFilter[i]);
        } else {
          console.log('On ne prends pas. Doublon de ' + resultFilter[i].sound);
        }
        i++;
      } else {
        break;
      }
    }

    return resultCount;
  }

  randomize(a: any) {
    let b: number, c: number, d: number;
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
      }, (e: any) => {
        console.log(e);
      });
    } catch (e) {
      //console.log(e);
    }
    return urlLink;
  }


}
