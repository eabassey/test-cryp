import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as jobcardActions from '../_actions/job-cards.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './';


export interface JobcardsState extends EntityState<Jobcard> { }

// Reference to the adapter
export const adapter: EntityAdapter<Jobcard> = createEntityAdapter();

// Initial State of the Entity
const initialState = adapter.getInitialState();


export function reducer(state = initialState, action: jobcardActions.JobcardActions) {
  switch (action.type) {
    case jobcardActions.GET_ALL_JOBCARDS_SUCCESS:
      return adapter.addAll(action.payload.jobcards, state);


    case jobcardActions.GET_ALL_JOBCARDS_FAIL:
      return { ...state, errors: action.payload.errors };

    default:
      return state;
  }
}

// We grab a reference to the Workflow Feature State
export const getWorkflowState = createFeatureSelector<WorkflowState>('workflow');

// From the Workflow Feature State, we get the State of the ClaimSummary Entity
export const getJobcardEntityState = createSelector(getWorkflowState,
                                                          state => state.jobcards);


// Selectors for the Jobcard Entity itself
export const {
              selectAll: selectAllJobcards
             }
            = adapter.getSelectors(getJobcardEntityState);



// Jobcard Model
export interface Jobcard { }
