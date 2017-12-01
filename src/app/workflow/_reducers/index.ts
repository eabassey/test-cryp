import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClaimsSummary from './claims-summary.reducer';
import * as fromJobCards from './job-cards.reducer';
import * as fromApp from '../../_reducers';


export const reducers: ActionReducerMap<any> = {
  claimsSummary: fromClaimsSummary.reducer,
  jobcards: fromJobCards.reducer
};

export interface WorkflowState {
  claimsSummary: fromClaimsSummary.ClaimsSummaryState;
  jobcards: fromJobCards.JobcardsState;
}
export interface State extends fromApp.State {
  'workflow': WorkflowState;
}

 // SELECTORS //

// We grab a reference to the Workflow Feature State
export const getWorkflowState = createFeatureSelector<WorkflowState>('workflow');

// From the Workflow Feature State, we get the State of the ClaimSummary Entity
export const getClaimSummaryEntityState = createSelector(getWorkflowState,
  state => state.claimsSummary);


  // Selectors for the ClaimSummary Entity itself
export const {
  selectAll: selectAllClaimsSummary,
  selectEntities: selectClaimsSummaryEntities,
  selectIds: getClaimsSummaryIds,
  selectTotal: getTotalClaimsSummary
 }
= fromClaimsSummary.adapter.getSelectors(getClaimSummaryEntityState);
