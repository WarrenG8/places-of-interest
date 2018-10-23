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
  nearbyPlacesArr = [];

  constructor(public http: HttpClient, public geolocation: Geolocation) {
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15.1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

      let activeInfoWindow;

      let createMarker = (pos, name, markerColor) => {
        let imgUrl = "http://maps.google.com/mapfiles/ms/icons/";
        imgUrl += markerColor + "-dot.png";

        let infowindow = new google.maps.InfoWindow();

        let marker = new google.maps.Marker({
          position: pos,
          icon: {
            url: imgUrl
          }
        });
        
        marker.addListener('click', function() {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          } 
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(_ => marker.setAnimation(null), 700);
          infowindow.setContent(name);
          infowindow.open(this.map, marker);
          activeInfoWindow = infowindow;             
      });

        marker.setMap(this.map);    
        if(name !== 'Current Location') {
          this.nearbyPlacesArr.push({'name': name, 'marker' : marker});
        }
       
      }

      createMarker(latLng, "Current Location", "green");

      let request = {
        location: latLng,
        radius: 1100,
        type: ['restaurant']
      };
      
      let callback = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          return results.forEach(x => {
            if(x.rating >= 4.1) {
              createMarker(x.geometry.location, x.name,"red");
            }
          });
        }
      }

      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request, callback);

    }, (err) => {
      console.log(err);
    });  
  }
}
