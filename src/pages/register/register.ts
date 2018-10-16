import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapsPage } from '../maps/maps';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user:any = {};
  
  constructor(public navCtrl: NavController, public _use: UserProvider, private app: App) { }

  register(user) {
    this._use.register(this.user)
    .subscribe((res) => {
      console.log(res);  
    });
    this.goMaps();
  }
  goMaps(){
    this.app.getRootNav().setRoot(MapsPage, {}, {animate: true, direction: 'forward'});
  }
  
}
