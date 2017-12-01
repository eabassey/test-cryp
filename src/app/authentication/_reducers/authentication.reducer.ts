import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { User } from '../../shared/models';
import * as authenticationActions from '../_actions/authentication.actions';

export interface AuthenticationState {
  user: User;
  isAuthenticated: boolean;
  errors: Object;
  message: {
    status: number,
    message: string
  };
}

const initialState: AuthenticationState = {
  user: null,
  isAuthenticated: false,
  errors: null,
  message: {
    status: null,
    message: null
  }
};

export const authenticationAdapter: EntityAdapter<User> = createEntityAdapter<User>();


export function authenticationReducer(
  state: AuthenticationState = initialState, action: authenticationActions.AuthenticationActions ) {
  switch (action.type) {

    case authenticationActions.LOGIN_SUCCESS:
      const newState = {...state, user: action.payload.user, isAuthenticated: true};
      return newState;

    case authenticationActions.LOGIN_FAILED:
      return {...state, errors: action.payload.errors };

    case authenticationActions.SIGN_OUT_SUCCESS:
        return initialState;

    case authenticationActions.FORGOT_PASSWORD_SUCCESS:
      return {...state, message: action.payload};

    case authenticationActions.FORGOT_PASSWORD_FAIL:
      return {...state, message: action.payload.errors};

    default:
      return state;
  }
}
