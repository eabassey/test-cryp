import { Action } from '@ngrx/store';



export const GET_ALL_JOBCARDS = 'GET_ALL_JOBCARDS';
export const GET_ALL_JOBCARDS_SUCCESS = 'GET_ALL_JOBCARDS_SUCCESS';
export const GET_ALL_JOBCARDS_FAIL = 'GET_ALL_JOBCARDS_FAIL';

export class GetAllJobcards implements Action {
  readonly type = GET_ALL_JOBCARDS;
}

export class GetAllJobcardsSuccess implements Action {
  readonly type = GET_ALL_JOBCARDS_SUCCESS;
  constructor (public payload: {jobcards: any}) {}
}

export class GetAllJobcardsFail implements Action {
  readonly type = GET_ALL_JOBCARDS_FAIL;
  constructor(public payload: {errors: Object}) {}
}

export type JobcardActions
  = GetAllJobcards
  | GetAllJobcardsSuccess
  | GetAllJobcardsFail;
