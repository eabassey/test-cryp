import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ShowAuthedDirective } from './shared/directives/show-authed.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './shared/services/user.service';
import { ApiService } from './shared/services/api.service';
import { HttpModule } from '@angular/http';
import { JwtService } from './shared/services/jwt.service';
import { ERButtonComponent } from '../ER/atoms';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from './authentication/_reducers';

describe('AppComponent', () => {
let fixture: ComponentFixture<AppComponent>,
    component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ShowAuthedDirective,
        ERButtonComponent
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers
        }),
        HttpModule
      ],
      providers: [
        UserService,
        ApiService,
        JwtService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be created', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it('should set current user', () => {
  //   component.ngOnInit()
  //   expect(component.currentUser).toBeDefined();
  // });


});
