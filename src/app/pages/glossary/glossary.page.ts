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
    this.instruments = this.instrumentService.getInstruments();
    if (this.instruments === undefined) {
      this.instrumentService.loadInstruments();
      this.instruments = this.instrumentService.getInstruments();
    }
    this.loadAllSounds();
    this.instrumentsList = this.instruments;
  }

  loadAllSounds() {
    this.files = new Array();
    this.instruments.forEach((intru, i) => {
      const uri = intru.sound;

      if (this.platform.is('android')) {
        this.files[intru.id] = this.media.create('/android_asset/public/' + uri);
      }
      if (this.platform.is('ios')) {
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

  filterList(evt) {
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      this.instrumentsList = this.instruments;
      return;
    }
    this.instrumentsList = this.instruments.filter(currentInstru => {
      if (currentInstru.label && searchTerm) {
        if (currentInstru.label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  filterSegment(evt) {
    console.log(evt.detail.value);
    const family = evt.detail.value;
    if (family === 'all') {
      this.instrumentsList = this.instruments;
    } else {
      console.log(this.instruments);
      this.instrumentsList = this.instruments.filter(currentInstru => {
        if (currentInstru.family.label.toLowerCase() === family) {
          return true;
        }
        return false;
      });
    }
  }

  ngOnInit() {
  }

}
