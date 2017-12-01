import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as AuthenticationActions from '../_actions/authentication.actions';
import * as fromAuthentication from '../_reducers';
import {Observable} from 'rxjs/Observable';

import { UserService } from '../../shared';
import { ApiService } from '../../shared/services';
import { User } from '../../shared/models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  isSubmitting = false;
  message$: Observable<{status: number, message: string}>;
  errors$: Observable<Object>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _user: UserService,
    private _api: ApiService<User>,
    private _store: Store<fromAuthentication.State>
  ) {
    this.forgotForm = this._fb.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.message$ = this._store.select(state => state.authentication.login.message);
    this.errors$ = this._store.select(state => state.authentication.login.errors);
  }

  sendResetLink() {
    this.isSubmitting = true;
    const email = this.forgotForm.value;
    this._store.dispatch(new AuthenticationActions.ForgotPassword(email));
    // this._api.post('forgot_password/check-email', email).subscribe(res => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     this.message = res.message;
    //     this.isSuccess = true;
    //   }
    // });
    // console.log(email);
  }

}
