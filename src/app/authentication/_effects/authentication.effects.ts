import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import * as fromAuthentication from '../_actions/authentication.actions';
import { UserService, JwtService } from '../../shared/services/index';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CryptoService } from '../../shared/_crypto-test/_crypto.service';
import { Crypto2Service } from '../../shared/_crypto-test/_crypto2.service';

@Injectable()
export class AuthenticationEffects {

  @Effect() login$ = this.actions$.ofType<fromAuthentication.Login>(fromAuthentication.LOGIN)
  .switchMap(action =>
    this._user.attemptAuth(action.payload)
      .map(data => {
        this._route.navigate(['/dashboard']);
          console.log(data);
        // method 1
        const credentialsHash  = localStorage.getItem('hash');
        this.crypto.initializeKeyOnLoginSuccess(credentialsHash);

        // method 2 - this time use the user data object from the server as credentials
        // Note also that any changes made to the user object on server will mean regenerate keys.
        this.crypto2.createKeyAsBlobToIndexedDb(data);


        return ({type: 'LOGIN_SUCCESS', payload: data});
      })
      .catch((err) => of({type: 'LOGIN_FAILED', payload: err}))
  );

  @Effect() checkLogin$ = this.actions$.ofType<fromAuthentication.CheckLoggedInStatus>(fromAuthentication.CHECK_LOGGED_IN_STATUS)
    .switchMap(action =>
        this._user.getLoggedInUserFromServer()
          .map(data => {
            this._user.setAuth(data.user);
            return ({type: 'LOGIN_SUCCESS', payload: data});
          })
          .catch((err) => of({type: 'LOGIN_FAILED', payload: {errors: err}}))
    );

  @Effect() signout$ = this.actions$.ofType<fromAuthentication.SignOut>(fromAuthentication.SIGN_OUT)
  .map(action => {
    console.log('SIGNOUT');
    this._user.purgeAuth();
    location.replace(`http://localhost:4200/authentication/login`);

    // method 1
    // this.crypto.clearSessionStorage();

    // method 2
    this.crypto2.clearSessionStorageAndKey();

    return ({type: 'SIGN_OUT_SUCCESS'});
  });

  @Effect() forgot$ = this.actions$.ofType<fromAuthentication.ForgotPassword>(fromAuthentication.FORGOT_PASSWORD)
    .switchMap(action =>
      this._user.sendResetLink(action.payload)
        .map(data => {
          return ({type: 'FORGOT_PASSWORD_SUCCESS', payload: data});
        })
        .catch((err) => of({type: 'FORGOT_PASSWORD_FAILED', payload: err}))
    );

  constructor(
    private _user: UserService,
    private _jwt: JwtService,
    private actions$: Actions,
    private _route: Router,
    private crypto: CryptoService,
    private crypto2: Crypto2Service
  ) {}
}
