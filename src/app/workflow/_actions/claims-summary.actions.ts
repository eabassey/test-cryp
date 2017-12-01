import { Action } from '@ngrx/store';



export const GET_ALL_CLAIMS = 'GET_ALL_CLAIMS';
export const GET_ALL_CLAIMS_SUCCESS = 'GET_ALL_CLAIMS_SUCCESS';
export const GET_ALL_CLAIMS_FAIL = 'GET_ALL_CLAIMS_FAIL';

export class GetAllClaims implements Action {
  readonly type = GET_ALL_CLAIMS;
}

export class GetAllClaimsSuccess implements Action {
  readonly type = GET_ALL_CLAIMS_SUCCESS;
  constructor (public payload: any) {}
}

export class GetAllClaimsFail implements Action {
  readonly type = GET_ALL_CLAIMS_FAIL;
  constructor(public payload: {errors: Object}) {}
}

export type ClaimActions
  = GetAllClaims
  | GetAllClaimsSuccess
  | GetAllClaimsFail;
