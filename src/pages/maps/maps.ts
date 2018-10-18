import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MapProvider } from '../../providers/map/map';
import { LoginPage } from '../login/login';
// import { Geolocation } from 'ionic-native';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  // @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  // mapInitialised: boolean = false;
  // apiKey: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _use: UserProvider, public _map: MapProvider) {
    this.loadMap();
  }

  // ionViewDidLoad(){
  //   this.loadMap();
  // }
 
  loadMap(){
 
    let locationOptions = {timeout: 20000, enableHighAccuracy: true};
 
    navigator.geolocation.getCurrentPosition(
 
        (position) => {
 
            let options = {
              center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
 
            this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
        },
 
        (error) => {
            console.log(error);
        }, locationOptions
    );
  }
}

