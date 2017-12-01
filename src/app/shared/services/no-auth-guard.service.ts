import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { User } from '../models';
import * as fromAuthentication from '../../authentication/_reducers';

@Injectable()
export class NoAuthGuard implements CanActivate {
  authenticated$: Observable<boolean>;

  constructor(private _router: Router,
              private _user: UserService,
              private _store: Store<fromAuthentication.State>) {
      this.authenticated$ = _store.select(fromAuthentication.getIsAuthenticated);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticated$.map(bool => !bool);
  }
}
