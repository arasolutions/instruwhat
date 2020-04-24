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

  constructor(private activatedRoute: ActivatedRoute, public media: Media) { }

  interval: any;
  percent: number;
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    const file = this.media.create('https://www.pacdv.com/sounds/people_sound_effects/climbing-stairs-1.mp3');
    file.onStatusUpdate.subscribe(status => {
      console.log(status);
      if (status == 1) {
        // STARTING
        console.log(JSON.stringify(file));
        this.percent = 0;
      }
      if (status == 2) {
        // RUNNING
        // get current playback position
        this.interval = setInterval(() => {
          file.getCurrentPosition().then((position) => {
            this.percent = position / file.getDuration();
            console.log(this.percent);
          });
        }, 100);
      }
      if (status == 4) {
        // STOPPING
        console.log("Terminé");
        file.stop();
        clearInterval(this.interval);
      }
    }); // fires when file status changes
    file.onSuccess.subscribe(() => console.log('Action is successful'));
    file.onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); console.log(JSON.stringify(file)); });
    // play the file
    file.play();
  }

  changePercent(file: MediaObject) {
    file.getCurrentPosition().then((position) => {
      this.percent = position / file.getDuration();
      console.log(this.percent);
    });
  }

}
