import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggingService } from './logging.service';
import { FirestoreService } from './firestore.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBNWXMU_UiF0A1PG_QtA-rgnSAA9xmSyYA",
  authDomain: "notesapp-bbc51.firebaseapp.com",
  databaseURL: "https://notesapp-bbc51.firebaseio.com",
  projectId: "notesapp-bbc51",
  storageBucket: "notesapp-bbc51.appspot.com",
  messagingSenderId: "743065542999",
  appId: "1:743065542999:web:72079734fe6b4dcca95e12",
  measurementId: "G-R5Q46Y7GX1"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestore,
    LoggingService,
    AngularFirestoreModule,
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
