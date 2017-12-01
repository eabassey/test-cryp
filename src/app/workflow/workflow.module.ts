import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './_reducers';

import { SharedModule } from '../shared/shared.module';

import { WorkflowComponent } from './workflow.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowFlowComponent } from './workflow-flow/workflow-flow.component';
import { WorkflowRouting } from './workflow.routing';
import { WorkflowEffects } from './_effects/workflow.effects';
import { ClaimService } from '../shared/services/claims.service';

@NgModule({
  imports: [
    CommonModule,
    WorkflowRouting,
    SharedModule,
    StoreModule.forFeature('workflow', reducers),
    EffectsModule.forFeature([WorkflowEffects])
  ],
  declarations: [WorkflowComponent, WorkflowListComponent, WorkflowFlowComponent],
  providers: [ClaimService]
})
export class WorkflowModule { }
