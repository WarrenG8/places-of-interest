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

  // loggedIn: boolean = false;

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
    if (resData !== null) {
      window.sessionStorage.setItem( "token", resData.token);
      window.sessionStorage.setItem( "userId", resData.userId);
    }
    this.app.getRootNav().setRoot(page, {}, {animate: true, direction: 'forward'});
  }

  logout(){
    let token = window.sessionStorage.getItem("token");
    console.log(token);
    window.sessionStorage.clear();
    return this.http.post(this.url + '/logout?access_token=' + token, {});
  }

}
