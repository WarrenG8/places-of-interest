import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapsPage } from '../maps/maps';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user:any = {};
  
  constructor(public navCtrl: NavController, public _use: UserProvider) { }

  register(user) {
    this._use.register(this.user)
    .subscribe((res) => {
      console.log(res);  
      this._use.goMaps(res, MapsPage);
    }); 
  }  

  routeToLogin() {
    this.navCtrl.setRoot(LoginPage); 
  }
}
