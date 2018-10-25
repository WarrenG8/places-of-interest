import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapsPage } from '../maps/maps';
import { RegisterPage } from '../register/register';
import { MenuController} from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserProvider]
})
export class LoginPage {
  user = {};

  constructor(public navCtrl: NavController, public _use: UserProvider, public menuCtrl: MenuController, public events: Events) {
    this.menuCtrl.enable(false, 'myMenu');
  }

  createUser(user) {
    this.events.publish('user:created', user, Date.now());
  }

  login(user) {
    this._use.login(this.user)
    .subscribe((res) => {
      console.log(res);
      this._use.goMaps(res, MapsPage); 
    });
    this.createUser(user);
  }

  routeToRegister() {
    this.navCtrl.setRoot(RegisterPage); 
  }
  
}
