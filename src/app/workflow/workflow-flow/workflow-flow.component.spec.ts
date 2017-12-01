import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowFlowComponent } from './workflow-flow.component';

describe('WorkflowFlowComponent', () => {
  let component: WorkflowFlowComponent;
  let fixture: ComponentFixture<WorkflowFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
