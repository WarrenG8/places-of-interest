import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;

@Injectable()
export class MapProvider {

  map: any;

  constructor(public http: HttpClient, public geolocation: Geolocation) {
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Hello World!'
      });
      marker.setMap(this.map);
 
    }, (err) => {
      console.log(err);
    });
  }
}
