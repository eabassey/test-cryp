import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkflowComponent } from './workflow.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowFlowComponent } from './workflow-flow/workflow-flow.component';

const workflowRoutes: Routes = [
  {
   path: '',
   component: WorkflowComponent,
   children: [
     {
       path: '',
       redirectTo: '/workflow/list',
       pathMatch: 'full'
     },
     {
       path: 'list',
       component: WorkflowListComponent
     },
     {
       path: 'flow',
       component: WorkflowFlowComponent
     }
   ]
  }
];
export const WorkflowRouting: ModuleWithProviders = RouterModule.forChild(workflowRoutes);
