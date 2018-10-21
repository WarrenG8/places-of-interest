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
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      let createMarker = (pos) => {
        let marker = new google.maps.Marker({
          position: pos,
          title: 'Hello World!'
        });
        marker.setMap(this.map);
      }

      let currentLocation = createMarker(latLng);

      let request = {
        location: latLng,
        radius: 1000,
        type: ['point_of_interest']
      };

      let callback = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          return results.forEach(x => createMarker(x.geometry.location));
        }
      }
  
      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request, callback);      
 
    }, (err) => {
      console.log(err);
    });
  }
}
