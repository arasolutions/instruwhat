import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';

import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-final-game',
  templateUrl: './final-game.page.html',
  styleUrls: ['./final-game.page.scss'],
})
export class FinalGamePage implements OnInit {

  questionnaire: any;

  files: MediaObject[];

  interval: any;

  currentFile: number;

  constructor(public router: Router, public platform: Platform, public route: ActivatedRoute, public media: Media, public questionnaireService: QuestionnaireService) {
    this.questionnaire = this.questionnaireService.getQuestionnaire();

    this.loadAllSounds();

    this.currentFile = null;

  }

  ngOnInit() {
    const backButtonSub = this.platform.backButton.subscribeWithPriority(10000, () => {
      this.router.navigate(['/param-game']);
    });
  }

  loadAllSounds() {
    this.files = new Array();
    this.questionnaire.questions.forEach((question, i) => {
      const uri = question.goodAnswer.sound;

      if (this.platform.is('android')) {
        this.files.push(this.media.create('/android_asset/public/' + uri));
      }
      if (this.platform.is('ios')) {
        this.files.push(this.media.create('/android_asset/public/' + uri));
      }
      this.files[i].onStatusUpdate.subscribe(status => {
        if (status == 1) {
          // STARTING
        }
        if (status == 2) {
          // RUNNING
          // get current playback position
        }
        if (status == 4) {
          // STOPPING
          this.afterStop(i);
        }
      }); // fires when files status changes

      this.files[i].onSuccess.subscribe(() => console.log('Action is successful'));
      this.files[i].onError.subscribe(error => { console.log('Error! ' + JSON.stringify(error)); });
    });
  }

  play(indexFile: number) {
    // play the files
    if (!this.currentFile != null) {
      this.stop(this.currentFile);
    }
    this.files[indexFile].play();
    this.currentFile = indexFile;
    this.questionnaire.questions[indexFile].playing = true;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.files[indexFile].getCurrentPosition().then((position) => {
        this.questionnaire.questions[indexFile].percent = position / this.files[indexFile].getDuration();
      });
    }, 50);
  }

  stop(indexFile: number) {
    this.files[indexFile].stop();
    this.currentFile = null;
    clearInterval(this.interval);
    this.questionnaire.questions[indexFile].playing = false;
    this.afterStop(indexFile);
  }

  afterStop(indexFile: number) {
    this.questionnaire.questions[indexFile].percent = 0;
  }

  restartGame() {
    this.router.navigate(['/initial-game'], { queryParams: { form: JSON.stringify(this.questionnaire.form) } });
  }

  stopGame() {
    this.router.navigate(['/param-game']);
  }

}
