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
    alert(1);
    /*this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    alert(2);
    this.file = this.media.create('https://www.pacdv.com/sounds/people_sound_effects/climbing-stairs-1.mp3');
    alert(3);
    this.file.onStatusUpdate.subscribe(status => {
      alert(status);
      if (status == 1) {
        // STARTING
        alert(JSON.stringify(this.file));
        this.percent = 0;
      }
      if (status == 2) {
        // RUNNING
        // get current playback position
        this.interval = setInterval(() => {
          this.file.getCurrentPosition().then((position) => {
            this.percent = position / this.file.getDuration();
            alert(this.percent);
          });
        }, 100);
      }
      if (status == 4) {
        // STOPPING
        alert("Terminé");
        this.file.stop();
        clearInterval(this.interval);
      }
    }); // fires when file status changes
    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); console.log(JSON.stringify(this.file)); });
    // play the file
    this.file.play();*/
  }
}
