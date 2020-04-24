import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public media: Media, public platform: Platform) {
    alert("constructor");
  }

  interval: any;
  percent: number;
  file: MediaObject;

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }

  load(uri: string) {
    if (this.platform.is('android')) {
      this.file = this.media.create('/android_asset/public/' + uri);
    }
    if (this.platform.is('ios')) {
      this.file = this.media.create('/android_asset/public/' + uri);
    }
    this.file.onStatusUpdate.subscribe(status => {
      if (status == 1) {
        // STARTING
        this.percent = 0;
      }
      if (status == 2) {
        // RUNNING
        // get current playback position

      }
      if (status == 4) {
        // STOPPING
        this.stop
      }
    }); // fires when file status changes
    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); console.log(JSON.stringify(this.file)); });
    this.play();
  }

  play() {
    // play the file
    this.file.play();
    this.interval = setInterval(() => {
      this.file.getCurrentPosition().then((position) => {
        this.percent = position / this.file.getDuration();
      });
    }, 50);
  }

  stop() {
    alert("Terminé");
    this.percent = 1;
    this.file.stop();
    clearInterval(this.interval);
  }

}
