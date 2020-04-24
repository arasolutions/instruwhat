import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

import { ModelsInstrumentComponent } from '../../components/models-instrument/models-instrument';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public interval: any;
  public percent: number = 0;
  public playing: boolean = false;

  public file: MediaObject;

  public instruments: ModelsInstrumentComponent[];

  constructor(private activatedRoute: ActivatedRoute, public media: Media, public platform: Platform) {
    this.instruments = new Array();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    let instru = new ModelsInstrumentComponent();
    this.instruments.push(instru);
    instru = new ModelsInstrumentComponent();
    this.instruments.push(instru);
    instru = new ModelsInstrumentComponent();
    this.instruments.push(instru);
    instru = new ModelsInstrumentComponent();
    this.instruments.push(instru);
    this.load();
  }

  load() {
    const uri = 'assets/instruments/cordes/cordes-frappees/piano/SSBM.mp3';
    if (this.platform.is('android')) {
      this.file = this.media.create('/android_asset/public/' + uri);
    }
    if (this.platform.is('ios')) {
      this.file = this.media.create('/android_asset/public/' + uri);
    }
    this.file.onStatusUpdate.subscribe(status => {
      if (status == 1) {
        // STARTING
      }
      if (status == 2) {
        // RUNNING
        // get current playback position
      }
      if (status == 4) {
        // STOPPING
        this.stop();
      }
    }); // fires when file status changes

    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); });
    this.play();
  }

  play() {
    // play the file
    this.file.play();
    this.playing = true;
    this.interval = setInterval(() => {
      this.file.getCurrentPosition().then((position) => {
        this.percent = position / this.file.getDuration();
      });
    }, 50);
  }

  stop() {
    console.log("Terminé");
    this.percent = 1;
    this.playing = false;
    this.file.stop();
    clearInterval(this.interval);
  }

}
