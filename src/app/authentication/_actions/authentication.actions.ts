import { Action } from '@ngrx/store';
import { User } from '../../shared/models';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const CHECK_LOGGED_IN_STATUS = 'CHECK_LOGGED_IN_STATUS';
export const GET_LOGGED_IN_USER_SUCCESS = 'GET_LOGGED_IN_USER_SUCCESS';
export const GET_LOGGED_IN_USER_FAILED = 'GET_LOGGED_IN_USER_FAILEDß';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: {credentials: Object}) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: {user: User}) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: {errors: Object}) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SignOutSuccess implements Action {
  readonly type = SIGN_OUT_SUCCESS;
}

export class ForgotPassword implements Action {
  readonly type = FORGOT_PASSWORD;
  constructor(public payload: {email: string}) {}
}

export class ForgotPasswordSuccess implements  Action {
  readonly type = FORGOT_PASSWORD_SUCCESS;
  constructor(public payload: {message: {status: number, message: string}}) {}
}

export class ForgotPasswordError implements  Action {
  readonly type = FORGOT_PASSWORD_FAIL;
  constructor(public payload: {errors: Object}) {}
}

export class CheckLoggedInStatus implements Action {
  readonly type = CHECK_LOGGED_IN_STATUS;
}

export type AuthenticationActions
  = Login
  | LoginSuccess
  | LoginFailed
  | SignOut
  | SignOutSuccess
  | ForgotPassword
  | ForgotPasswordSuccess
  | ForgotPasswordError;
