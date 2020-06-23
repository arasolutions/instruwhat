import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';

import { QuestionnaireService } from '../../../services/questionnaire.service';
import { ScoreService } from '../../../services/score.service';

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

  name: string;

  constructor(
    public router: Router,
    public platform: Platform,
    public route: ActivatedRoute,
    public media: Media,
    public questionnaireService: QuestionnaireService,
    public alertCtrl: AlertController,
    public scoreService: ScoreService) {
    this.questionnaire = this.questionnaireService.getQuestionnaire();

    this.loadAllSounds();
    this.currentFile = null;

  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.router.navigate(['/param-game']);
    });
  }

  async ionViewWillEnter() {
    let scores = await this.scoreService.getScores(this.questionnaire.family, this.questionnaire.level, this.questionnaire.nbQuestions);
    if (scores.length > 0) {
      this.name = await this.scoreService.getNameScore();
    }
  }

  loadAllSounds() {
    this.files = new Array();
    this.questionnaire.questions.forEach((question: any, i: number) => {
      const uri = question.goodAnswer.sound;
      if (uri.indexOf('http') == 0) {
        this.files.push(this.media.create(uri));
      } else {
        if (this.platform.is('android')) {
          this.files.push(this.media.create('/android_asset/public/' + uri));
        } else {
          this.files.push(this.media.create(uri));
        }
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
    if (this.currentFile != null) {
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
    this.releaseAll()
    this.router.navigate(['/initial-game'], { queryParams: { form: JSON.stringify(this.questionnaire.form) } });
  }

  stopGame() {
    this.releaseAll();
    this.router.navigate(['/index']);
  }

  releaseAll() {
    if (this.currentFile != null) {
      this.stop(this.currentFile);
    }
    for (let i = 0; i < this.files.length; i++) {
      this.files[i].release();
    }
  }

  saveResult() {
    this.alertCtrl.create({
      header: 'Enregistre ton score !',
      message: 'Renseigne ton nom (10 caractères maximum)',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'NOM',
          value: this.name
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Enregistrer',
          handler: async (prompt) => {
            this.name = prompt.name;
            console.log(this.name);
            let name = prompt.name.toUpperCase().substring(0, 10);
            if (name === '') {
              name = 'INCONNU';
            }

            await this.scoreService.setNameScore(name);

            const scoreId: number = await this.scoreService.addScore(name, this.questionnaire.score, this.questionnaire.family, this.questionnaire.level, this.questionnaire.nbQuestions);

            let navigationExtras: NavigationExtras = {
              queryParams: {
                form: JSON.stringify(this.questionnaire.form),
                scoreId: scoreId
              }
            };
            this.router.navigate(['/scores'], navigationExtras);
          }
        }]
    }).then(alert => alert.present());
  }

}
