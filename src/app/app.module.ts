import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MapsPage } from '../pages/maps/maps';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { MapProvider } from '../providers/map/map';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    MapsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapProvider,
    UserProvider,
    Geolocation
  ]
})
export class AppModule {}
