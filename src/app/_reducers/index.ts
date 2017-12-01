import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';

export interface State {
  routerReducer: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer
};

/// ROUTER SERIALIZER ///

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    return { url, queryParams };
  }
}
