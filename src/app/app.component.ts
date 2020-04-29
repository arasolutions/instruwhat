import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public items = [
    {
      'label': 'Jouer',
      'path': '/param-game',
      'icon': 'play-outline'
    },
    {
      'label': 'Mes scores',
      'path': '/scores',
      'icon': 'medal-outline'
    },
    {
      'label': 'Paramètres',
      'path': '/settings',
      'icon': 'options-outline'
    },
    {
      'label': 'Lexique',
      'path': '/glossary',
      'icon': 'book-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.preloadImages();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  preloadImages() {
    // Icones chargement

  }

  ngOnInit() {
  }
}
