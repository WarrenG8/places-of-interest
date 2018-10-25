import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapsPage } from '../maps/maps';
import { LoginPage } from '../login/login';
import { MenuController} from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user:any = {};
  
  constructor(public navCtrl: NavController, public _use: UserProvider, public menuCtrl: MenuController, public events: Events) {
    this.menuCtrl.enable(false, 'myMenu');
   }

   createUser(user) {
    this.events.publish('user:created', user, Date.now());
  }


  register(user) {
    this._use.register(this.user)
    .subscribe((res) => {
      console.log(res);  
      this._use.goMaps(res, MapsPage);
    }); 
    this.createUser(user);
  }  

  routeToLogin() {
    this.navCtrl.setRoot(LoginPage); 
  }
}
