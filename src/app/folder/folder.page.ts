import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

import { InstrumentService } from '../../services/instrument.service';

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

  public clicked:number;
  public goodAnswer: any;

  constructor(private activatedRoute: ActivatedRoute, public media: Media, public platform: Platform, public instrumentService: InstrumentService) {
    this.instrumentService.loadInstruments();
    this.goodAnswer = this.instrumentService.instruments[0];
    console.log(this.goodAnswer);

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.load();
  }

  load() {
    const uri = 'assets/instruments/cordes/cordes-frappees/piano/piano.mp3';
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
        this.afterStop();
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
    this.file.stop();
  }

  afterStop() {
    this.percent = 1;
    this.playing = false;
    this.playing = false;
  }

  choose(instrumentChosen: any) {
    this.clicked = instrumentChosen.id;
  }

}
