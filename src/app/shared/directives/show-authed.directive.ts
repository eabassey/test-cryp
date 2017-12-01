import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserService } from '../services/';

@Directive({selector: '[showAuthed]'})
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(private templateRef: TemplateRef<any>,
              private _user: UserService,
              private viewContainer: ViewContainerRef) {
  }

  @Input()
  set showAuthed(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit() {
    // this._user.isAuthenticated.subscribe(
    //   (isAuthenticated) => {
    //     if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
    //       this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //       this.viewContainer.clear();
    //     }
    //   }
    // );
  }
}
