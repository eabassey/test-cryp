import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ClaimService {
  apiUrl = environment.api_url;

  constructor(private _api: ApiService<any>,
              private _jwt: JwtService) {
  }

  getAllClaims() {
    if (this._jwt.getToken()) {
      const startTime = new Date().getTime();
      return this._api.get<any>('claim/')
      .do(x => console.log(`Get all claims from server: ${(new Date().getTime()) - startTime} ms`))
       .map(data => data);
    }
  }

  // TODO Stuff --
  getAllJobcards() {
    if (this._jwt.getToken()) {
      return this._api.get<any>('job/')
       .map(data => data);
    }
  }

}
