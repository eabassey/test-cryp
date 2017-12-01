import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

import { UserService } from './shared/services';
import { User } from './shared/models/';

import { Store } from '@ngrx/store';
import * as fromAuthenticationActions from './authentication/_actions/authentication.actions';
import * as fromAuthentication from './authentication/_reducers';
import { IndexedDbService } from './shared/_crypto-test/indexed-db.service';
import { CryptoService } from './shared/_crypto-test/_crypto.service';
import { INIT_VECTOR, AES_CBC_KEY_NAME } from './shared/_crypto-test/config';
import { Util } from './shared/_crypto-test/_util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // currentUser$: User;
  loggedInUser$: Observable<User>;
  constructor(
    private _user: UserService,
    private db: IndexedDbService,
    private crypto: CryptoService,
    @Inject(INIT_VECTOR) private ivName: any,
    @Inject(AES_CBC_KEY_NAME) private aesKeyName: string,
    private _store: Store<fromAuthentication.State>
  ) {
    _store.dispatch(new fromAuthenticationActions.CheckLoggedInStatus());

    this.loggedInUser$ = _store.select(fromAuthentication.currentUser);
  }

  ngOnInit() {
    this.crypto.initializeAtStart();
  }



  signOut() {
    this._store.dispatch(new fromAuthenticationActions.SignOut());
  }
}
