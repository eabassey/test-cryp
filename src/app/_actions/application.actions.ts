import { Action } from '@ngrx/store';
import { User } from '../shared/models';

export const CHECK_LOGGED_IN_STATUS = 'CHECK_LOGGED_IN_STATUS';
export const GET_LOGGED_IN_USER_SUCCESS = 'GET_LOGGED_IN_USER_SUCCESS';
export const GET_LOGGED_IN_USER_FAILED = 'GET_LOGGED_IN_USER_FAILEDß';

export class CheckLoggedInStatus implements Action {
  readonly type = CHECK_LOGGED_IN_STATUS;
}

export type ApplicationActions
  = CheckLoggedInStatus;