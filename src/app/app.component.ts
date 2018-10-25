import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MapProvider } from '../providers/map/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Keyboard } from '@ionic-native/keyboard';
import { UserProvider } from '../providers/user/user';
import { Events } from 'ionic-angular';

declare var google;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  nearbyPlacesArr;
  loggedIn;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public map : MapProvider,
    private screenOrientation: ScreenOrientation,
    public keyboard: Keyboard,
    public _user: UserProvider,
    public events: Events
    ) {
    this.initializeApp();
    this.nearbyPlacesArr = this.map.nearbyPlacesArr;
    events.subscribe('user:created', (user, time) => {
      // refreshes side menu on logout
      this.nearbyPlacesArr.length = 0;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.keyboard.hide();
      this.splashScreen.hide();
      this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .then(status => console.log(status))
      .catch (e => console.log(e));
      });
  }

  openWindow(place) {
    google.maps.event.trigger(place.marker, 'click');
  }
}
