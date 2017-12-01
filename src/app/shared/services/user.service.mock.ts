import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ApiService } from './api.service';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { MockBackend } from '@angular/http/testing';

//constants
export const testEnvironment = {
  api_url: 'api/'
}


export class ApiServiceMock {
  constructor(private _http: HttpServiceMock, private _jwt: JwtServiceMock){}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this._jwt.getToken()) {
      headersConfig['Authorization'] = `Token ${this._jwt.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this._http.post(`${testEnvironment.api_url}${path}/`, JSON.stringify(body), {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  get (path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this._http.get(`${testEnvironment.api_url}${path}`)
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this._http.put(`${testEnvironment.api_url}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this._http.delete(`${testEnvironment.api_url}${path}`, {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }
}

export class HttpServiceMock {
  
  get(path: string, options?: object): Observable<any> {
    if(path === 'api/user/') {
      return Observable.of(JSON.stringify(testDb.users[0].data));
    }
    return Observable.empty();
  }

  post(path: string,body: any, headers?: object): Observable<any> {
    return;
  }

  put(path: string, body: any, options?: object): Observable<any> {
    return;
  }

  delete(path: string, options?: object):Observable<any> {
    return;
  }
}

export class JwtServiceMock {
  
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";

  getToken(): string {
    return this.token;
  }

  saveToken(token: string): void {
    this.token = token;
  }

  destroyToken(): void {
    this.token = null;
  }
}


/////////////////////BACK END TEST DATA //////////////////////////

//db interfaces
interface Collection {
  data: any;
}

interface TestDb {
  users: Collection[];
}

//test db
const testDb: TestDb = {
 users: [
   {
     data: {
       user: { 
        email: 'test@standardbank.co.za', 
        first_name: 'Daniel', 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ', 
        user_type: 'admin', 
        sp_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
      }
     }
   }
 ]
};