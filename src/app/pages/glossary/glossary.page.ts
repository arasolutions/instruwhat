import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';

import { InstrumentService } from '../../services/instrument.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.page.html',
  styleUrls: ['./glossary.page.scss'],
})
export class GlossaryPage implements OnInit {

  instruments: any;
  instrumentsList: any;
  interval: any;
  files: MediaObject[];

  constructor(public instrumentService: InstrumentService,
    public media: Media,
    public platform: Platform) {
  }

  async ionViewWillEnter() {
    this.instruments = this.instrumentService.getInstruments();
    if (this.instruments === undefined) {
      await this.instrumentService.loadInstruments(false);
      this.instruments = this.instrumentService.getInstruments();
    }
    this.instrumentsList = this.instruments;//
    this.instrumentsList = this.instruments.filter((element: any) => element.sound.indexOf('http') != 0 && element.photo.indexOf('http') != 0);

    this.loadAllSounds();
    this.instrumentsList.sort((a: any, b: any) => a.label.localeCompare(b.label));

  }

  loadAllSounds() {
    this.files = new Array();
    this.instrumentsList.forEach((intru: any) => {
      const uri = intru.sound;
      if (this.platform.is('android')) {
        this.files[intru.id] = this.media.create('/android_asset/public/' + uri);
      } else {
        this.files[intru.id] = this.media.create(uri);
      }
    });
  }

  play(intruId: number, indexFile: number) {
    if (this.instrumentsList[indexFile].playing) {
      // Stop the sound
      this.files[intruId].stop();
      this.files[intruId].release();
      clearInterval(this.interval);
      this.instrumentsList[indexFile].playing = false;
      this.instrumentsList[indexFile].percent = 0;
    } else {
      // Play the sound
      this.files[intruId].play();
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.files[intruId].getCurrentPosition().then((position) => {
          this.instrumentsList[indexFile].percent = position / this.files[intruId].getDuration();
        });
      }, 50);
      this.instrumentsList[indexFile].playing = true;
    }
  }

  filterList(evt: any) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.instrumentsList = this.instruments;
      return;
    }
    this.instrumentsList = this.instruments.filter((currentInstru: any) => {
      if (currentInstru.label && searchTerm) {
        if (currentInstru.sound.indexOf('http') != 0 && currentInstru.photo.indexOf('http') != 0) {
          if (currentInstru.label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      }
    });
  }

  filterSegment(evt: any) {
    const family = parseInt(evt.detail.value);
    if (family === 1) {
      this.instrumentsList = this.instruments.filter((element: any) => element.sound.indexOf('http') != 0 && element.photo.indexOf('http') != 0);
    } else {
      this.instrumentsList = this.instruments.filter((currentInstru: any) => {
        if (currentInstru.sound.indexOf('http') != 0 && currentInstru.photo.indexOf('http') != 0) {
          if (currentInstru.family['id'] === family) {
            return true;
          }
        }
        return false;
      });
    }
    this.instrumentsList.sort((a: any, b: any) => a.label.localeCompare(b.label));
  }

  ngOnInit() {
  }

}
