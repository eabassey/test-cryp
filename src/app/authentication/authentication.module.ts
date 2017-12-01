import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './_reducers';

import { SharedModule, NoAuthGuard } from '../shared';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authRouting } from './authentication.routing';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {AuthenticationEffects} from './_effects/authentication.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('authentication', reducers),
    EffectsModule.forFeature([AuthenticationEffects]),
    authRouting
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthenticationModule { }
