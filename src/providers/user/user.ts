import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private http: HttpClient, public app: App) {
  }

  url = 'http://localhost:3000/api/AppUsers';

  login(data) {
    return this.http.post(this.url + '/login', data);
  }

  register(user) {
    return this.http.post(this.url, user);
  }

  goMaps(resData, page){
    window.sessionStorage.setItem( "token", resData.token);
    window.sessionStorage.setItem( "userId", resData.userId);
    this.app.getRootNav().setRoot(page, {}, {animate: true, direction: 'forward'});
  }

}
