import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { ScoreService } from '../../services/score.service';

import { Family } from '../../enums/family.enum';
import { Level } from '../../enums/level.enum';

import { ScoreModel } from '../../models/score.model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {

  familyChosen: Family = Family.ALL;
  levelChosen: Level = Level.EASY;
  questionsChosen: number = 10;

  scores: ScoreModel[] = new Array<ScoreModel>();

  constructor(public alertController: AlertController, public scoreService: ScoreService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getScores();
    console.log(this.scores);
  }

  async changeFamily() {
    let options = {
      header: 'Changer la famille',
      inputs: [],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.familyChosen = Family.getById(value);
            this.getScores();
          }
        }],
    };

    Family.getAll().forEach(family => {
      let option = { name: 'family', value: family.id, label: family.fulllabel, type: 'radio', checked: false };
      if (family.id == this.familyChosen['id']) {
        option.checked = true;
      }
      options.inputs.push(option);
    });

    const alert = await this.alertController.create(options);

    await alert.present();
  }

  async changeLevel() {
    let options = {
      header: 'Changer le niveau',
      inputs: [],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.levelChosen = Level.getByValue(value);
            this.getScores();
          }
        }],
    };

    Level.getAll().forEach(level => {
      let option = { name: 'level', value: level.value, label: level.label, type: 'radio', checked: false };
      if (level.value == this.levelChosen['value']) {
        option.checked = true;
      }
      options.inputs.push(option);
    });

    const alert = await this.alertController.create(options);

    await alert.present();
  }

  async changeNbQuestions() {

    const alert = await this.alertController.create({
      header: 'Changer le nombre de questions',
      inputs: [
        {
          name: 'nbQuestions',
          type: 'radio',
          label: '5 questions',
          value: 5,
          checked: this.questionsChosen == 5
        }, {
          name: 'nbQuestions',
          type: 'radio',
          label: '10 questions',
          value: 10,
          checked: this.questionsChosen == 10
        }, {
          name: 'nbQuestions',
          type: 'radio',
          label: '15 questions',
          value: 15,
          checked: this.questionsChosen == 15
        }, {
          name: 'nbQuestions',
          type: 'radio',
          label: '20 questions',
          value: 20,
          checked: this.questionsChosen == 20
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            this.questionsChosen = value;
            this.getScores();
          }
        }],
    });

    await alert.present();
  }

  async getScores() {
    this.scores = await this.scoreService.getScores(this.familyChosen, this.levelChosen, this.questionsChosen);
  }
}
