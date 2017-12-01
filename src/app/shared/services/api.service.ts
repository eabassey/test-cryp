import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { HttpHeaders, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';

@Injectable()
export class ApiService<T> {
  constructor(private _http: HttpClient,
              private _jwt: JwtService) {
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this._jwt.getToken()) {
      headersConfig['Authorization'] = `Token ${this._jwt.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  post<T>(path: string, body: T ): Observable<any> {
    return this._http.post(`${environment.api_url}${path}/`, JSON.stringify(body), {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: HttpResponse<any>) => res);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get<T>(`${environment.api_url}${path}`, {headers: this.setHeaders(), params: params })
      .catch(this.formatErrors)
      .map((res: HttpResponse<any>) => res);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this._http.put<T>(`${environment.api_url}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: HttpResponse<any>) => res);
  }

  delete(path): Observable<any> {
    return this._http.delete<T>(`${environment.api_url}${path}`, {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: HttpResponse<any>) => res);
  }
}
