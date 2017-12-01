import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
// import { map, mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as fromClaimsSummary from '../_actions/claims-summary.actions';
import * as fromJobcards from '../_actions/job-cards.actions';
import { ClaimService } from '../../shared/services/index';
import { Router } from '@angular/router';

@Injectable()
export class WorkflowEffects {
  constructor(
    private _claims: ClaimService,
    private _route: Router,
    private actions$: Actions
  ) { }

  @Effect() getAllClaims$ = this.actions$
    .ofType<fromClaimsSummary.GetAllClaims>(fromClaimsSummary.GET_ALL_CLAIMS)
    .switchMap(action =>
      this._claims.getAllClaims()
        .map(data => {
          return ({ type: 'GET_ALL_CLAIMS_SUCCESS', payload: data });
        })
        .catch((err) => of({ type: 'GET_ALL_CLAIMS_FAIL', payload: { errors: err } }))
    );

  // @Effect() getAllJobcards$ = this.actions$
  //   .ofType<fromJobcards.GetAllJobcards>(fromJobcards.GET_ALL_JOBCARDS)
  //   .switchMap(action =>
  //     this._claims.getAllJobcards()
  //       .map(data => {
  //         console.log(data);
  //         return ({ type: fromJobcards.GET_ALL_JOBCARDS_SUCCESS, payload: data });
  //       })
  //       .catch((err) => of({ type: fromJobcards.GET_ALL_JOBCARDS_FAIL, payload: { errors: err } }))
  //   );
}
