import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAuthentication from './authentication.reducer';
import * as fromApp from '../../_reducers';

export const reducers: ActionReducerMap<any> = {
  login: fromAuthentication.authenticationReducer
};

export interface AuthenticationState {
  login: fromAuthentication.AuthenticationState;
}

export interface State extends fromApp.State {
  authentication: AuthenticationState;
}

// Get currently logged in user
export const authenticated = (state: State) => state.authentication;
export const currentUser = createSelector(authenticated, (state: AuthenticationState) => state.login.user);

// Check authentication status
export const getIsAuthenticated = createSelector(authenticated, (state: AuthenticationState) => state.login.isAuthenticated);

