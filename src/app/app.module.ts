import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Media } from '@ionic-native/media/ngx';

import { InstrumentService } from './services/instrument.service';

const firebase = {
    apiKey: 'AIzaSyDr1yh5vc0RitEFvg5SA-rJpFTbTfu9vYs',
    authDomain: 'instruwhat.firebaseapp.com',
    databaseURL: 'https://instruwhat.firebaseio.com',
    projectId: 'instruwhat',
    storageBucket: 'instruwhat.appspot.com',
    messagingSenderId: '1036659892115',
    appId: '1:1036659892115:web:9820f9d160a0f5b62b1266',
    measurementId: 'G-EYK4G7C2EL'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAnalyticsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    InstrumentService,
    NavParams,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
