import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  apiUrl = environment.api_url;

  constructor(private _api: ApiService<User>,
              private _jwt: JwtService) {
  }

  // Verify JWT in localstorage with server & load user's info
  // This runs once on application startup

  getLoggedInUserFromServer() {
    if (this._jwt.getToken()) {
      // return this._api.get('user/');
      return this._api.get<User>('user/');

    }
    return Observable.throw(new Error('Get user information failed!'));
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this._jwt.saveToken(user.token);
    // Set current user data into an observable
    // this.currentUserSubject.next(user);
    // Set authenticated to true
    // this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(credentials): Observable<User> {
    return this._api.post('v2/auth/login', {user: credentials})
      .map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      );
  }

  sendResetLink(email): any {
    return this._api.post('forgot_password/check-email', email)
      .map(data => {
        return data;
      });
  }

  changePassword(credentials) {
    return this._api.post('v2/auth/change_password', {user: credentials})
      .map(
        data => {
          this.purgeAuth();
          return data;
        }
      );
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this._jwt.destroyToken();
  }
}
