import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MapProvider } from '../providers/map/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

declare var google;
@Component({
  templateUrl: 'app.html'
})



export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  nearbyPlacesArr;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public map : MapProvider,
    private screenOrientation: ScreenOrientation
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    this.nearbyPlacesArr = this.map.nearbyPlacesArr;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation
      .lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .then(status => console.log(status))
      .catch (e => console.log(e));
      });
  }

  openWindow(place) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    google.maps.event.trigger(place.marker, 'click');
  }
}
