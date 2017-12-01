import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';


import {
  SharedModule,
  ApiService,
  UserService,
  JwtService
} from './shared';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app.routing';
import * as fromApp from './_reducers';
import { IndexedDbService } from './shared/_crypto-test/indexed-db.service';
import { CryptoService } from './shared/_crypto-test/_crypto.service';
import { AES_CBC_KEY_NAME, INIT_VECTOR } from './shared/_crypto-test/config';
import { SessionStorageService } from './shared/_crypto-test/session-storage.service';
import { Crypto2Service } from './shared/_crypto-test/_crypto2.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(fromApp.reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreRouterConnectingModule
  ],
  providers: [
          ApiService,
          UserService,
           JwtService,
           { provide: RouterStateSerializer, useClass: fromApp.CustomRouterSerializer },
           IndexedDbService,
           SessionStorageService,
           CryptoService,
           Crypto2Service,
           { provide: AES_CBC_KEY_NAME, useValue: 'weriosvnqlwerw' },
           { provide: INIT_VECTOR, useValue: 'aweoidfopdfodpifpd' }
          ],
  bootstrap: [AppComponent]
})
export class AppModule { }
