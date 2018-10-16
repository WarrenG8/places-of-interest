import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapsPage } from '../maps/maps';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserProvider]
})
export class LoginPage {
  user = {};

  constructor(public navCtrl: NavController, public _use: UserProvider) {
  
  }

  login(user) {
    this._use.login(this.user)
    .subscribe((res) => {
      console.log(res); 
      this._use.goMaps(res, MapsPage); 
    });
  }
  
}
