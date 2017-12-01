import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as claimActions from '../_actions/claims-summary.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './';


export interface ClaimsSummaryState extends EntityState<ClaimSummary> { }

// Reference to the adapter
export const adapter: EntityAdapter<ClaimSummary> = createEntityAdapter();

// Initial State of the Entity
const initialState = adapter.getInitialState();


export function reducer(state = initialState, action: claimActions.ClaimActions) {
  switch (action.type) {
    case claimActions.GET_ALL_CLAIMS_SUCCESS:
      return adapter.addMany(action.payload, state);


    case claimActions.GET_ALL_CLAIMS_FAIL:
      return { ...state, errors: action.payload.errors };

    default:
      return state;
  }
}

// We grab a reference to the Workflow Feature State
// export const getWorkflowState = createFeatureSelector<WorkflowState>('workflow');

// From the Workflow Feature State, we get the State of the ClaimSummary Entity
// export const getClaimSummaryEntityState = createSelector(getWorkflowState,
//                                                           state => state.claimsSummary);


// Selectors for the ClaimSummary Entity itself
// export const {
//               selectAll: selectAllClaimsSummary
//              }
//             = adapter.getSelectors(getClaimSummaryEntityState);



// ClaimSummary Model
export interface ClaimSummary { }
