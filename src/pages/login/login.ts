import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapsPage } from '../maps/maps';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserProvider]
})
export class LoginPage {
  user = {};

  constructor(public navCtrl: NavController, public _use: UserProvider, private app: App) {
  
  }

  login(user) {
    this._use.login(this.user)
    .subscribe((res) => {
      console.log(res);  
    });
    this.goMaps();
  }
  goMaps(){
    this.app.getRootNav().setRoot(MapsPage, {}, {animate: true, direction: 'forward'});
  }


}
