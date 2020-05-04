import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Media, MediaObject} from '@ionic-native/media/ngx';

import { InstrumentService } from '../../services/instrument.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.page.html',
  styleUrls: ['./glossary.page.scss'],
})
export class GlossaryPage implements OnInit {

  instruments: any;
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
      console.log(this.instruments);
  }

    loadAllSounds() {
        this.files = new Array();
        this.instruments.forEach((intru, i) => {
            const uri = intru.sound;

            if (this.platform.is('android')) {
                this.files[intru.id] = this.media.create('/android_asset/public/' + uri);
            }
            if (this.platform.is('ios')) {
                this.files[intru.id] = this.media.create('/android_asset/public/' + uri);
            }
        });
    }

    play(intruId: number, indexFile: number) {
      if (this.instruments[indexFile].playing) {
          // Stop the sound
          this.files[intruId].stop();
          clearInterval(this.interval);
          this.instruments[indexFile].playing = false;
          this.instruments[indexFile].percent = 0;
      } else {
          // Play the sound
          this.files[intruId].play();
          clearInterval(this.interval);
          this.interval = setInterval(() => {
              this.files[intruId].getCurrentPosition().then((position) => {
                  this.instruments[indexFile].percent = position / this.files[intruId].getDuration();
              });
          }, 50);
          this.instruments[indexFile].playing = true;
      }
    }

  ngOnInit() {
  }

}
