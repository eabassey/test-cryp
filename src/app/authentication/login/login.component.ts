import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserService } from '../../shared/services';
import { User, Errors } from '../../shared/models';
import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../_actions/authentication.actions';
import * as fromAuthentication from '../_reducers';
import { CryptoService } from '../../shared/_crypto-test/_crypto.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  currentUser: User;
  errors$: Observable<Object>;

  constructor(
    private crypto: CryptoService,
    private _fb: FormBuilder,
    private _router: Router,
    private _user: UserService,
    private _store: Store<fromAuthentication.State>
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errors$ = this._store.select(state => state.authentication.login.errors);
  }

  login() {
    this.isSubmitting = true;
    const credentials = this.loginForm.value;
    this._store.dispatch(new AuthenticationActions.Login(credentials));

    //  method 1
    this.crypto.hashCredentialsAndStoreHash(credentials);
  }

}
