import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;

@Injectable()
export class MapProvider {

  map: any;
  // url = '"https://maps.googleapis.com/maps/api/js?key=AIzaSyDHnwasWv7pFx7mWbH5098g8I367NLkbdc&callback=initMap"'

  constructor(public http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }

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
