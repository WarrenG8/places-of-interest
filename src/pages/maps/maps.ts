import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapProvider } from '../../providers/map/map';
import { LoginPage } from '../login/login';
import { MenuController} from 'ionic-angular';
/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _use: UserProvider, public _map: MapProvider, public menuCtrl: MenuController) {
    this._map.loadMap();
    this.menuCtrl.enable(true, 'myMenu');
  }

  logout(){
    this._use.logout()
    .subscribe((res) => { 
      console.log(res);
      this._use.goMaps(res, LoginPage);
    });
  }
  
}


