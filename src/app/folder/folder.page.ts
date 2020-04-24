import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public media: Media) {
    alert("constructor");
  }

  interval: any;
  percent: number;
  file: MediaObject;

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }

  load(uri: string) {
    this.file = this.media.create(uri);
    alert(3);
    this.file.onStatusUpdate.subscribe(status => {
      if (status == 1) {
        // STARTING
        alert(JSON.stringify(this.file));
        this.percent = 0;
      }
      if (status == 2) {
        // RUNNING
        // get current playback position

      }
      if (status == 4) {
        // STOPPING
        alert("Terminé");
        this.percent = 1;
        this.file.stop();
        clearInterval(this.interval);
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

}
