import { ApiService } from './api.service';
import { Http, URLSearchParams, HttpModule, XHRBackend, ResponseOptions, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TestBed, inject } from '@angular/core/testing';

describe('Api Service', () => {
  let apiService, httpMock, jwtServiceMock;
  let mockbackend, service;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [ HttpModule ],
  //     providers: [
  //       JwtService,
  //       ApiService,
  //       { provide: XHRBackend, useClass: MockBackend }
  //     ]
  //   })
  // });

  // beforeEach(inject([ApiService, XHRBackend], (service, mockbackend) => {
  //   mockbackend = mockbackend;
  //   service = service;
  // }));

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('httpMock', ['get', 'post', 'put', 'delete']);
    jwtServiceMock = jasmine.createSpyObj('jwtServiceMock', ['getToken', 'saveToken', 'destroyToken']);

    apiService = new ApiService(httpMock, jwtServiceMock);
  });

  // it('should return mocked response', () => {
  //   let mockResponse = {
  //     data: [
  //       {id:1, type: 'geyser'}, 
  //       {id:2, type: 'ceiling'}
  //     ]
  //   };
  //   mockbackend.connections.subscribe(connection => {
  //     connection.mockRespond(new Response(new ResponseOptions({
  //       body: JSON.stringify(mockResponse)
  //     })));

  //     service.get()
  //   });

  // });


  describe('get function', () => {
    let retrievedValues,
      observableValues$;

    beforeEach(() => {
      httpMock.get.and.returnValue(Observable.of({ json: () => [{ id: 1, type: 'geyser' }, { id: 2, type: 'pipes' }] }));

      retrievedValues = [];

      observableValues$ = apiService.get('/claims', {});

      observableValues$.subscribe(values => {
        retrievedValues = values;
      });
    });

    it('should return the right number of values', () => {
      expect(retrievedValues.length).toEqual(2);
    });

    it('should call the http.get once', () => {

      expect(httpMock.get).toHaveBeenCalled();
      expect(httpMock.get).toHaveBeenCalledTimes(1);
    });

    it('should call http.get with the right argument types', () => {

      expect(httpMock.get).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    });

  });


  describe('post function', () => {
    let observableValues$,
      retrievedValues;

    beforeEach(() => {
      httpMock.post.and.returnValue(Observable.of({ json: () => [{ id: 1, type: 'geyser' }, { id: 2, type: 'pipes' }] }));
      observableValues$ = apiService.post('/claims', { id: 1, type: 'roofing' });
    });

    it('should call http.post with the right argument types', () => {
      httpMock.post('/claims', {});

      expect(httpMock.post).toHaveBeenCalled();
      expect(httpMock.post).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    });

    it('should call the http.post once', () => {

      expect(httpMock.post).toHaveBeenCalled();
      expect(httpMock.post).toHaveBeenCalledTimes(1);
    });


  });

  describe('put function', () => {

    beforeEach(() => {
      httpMock.put.and.returnValue(Observable.of({ json: () => [] }));
      apiService.put('/claims/1', { id: 1, type: 'roofing' });
    });

    it('should call http.put with the right argument types', () => {
      httpMock.put('/claims/1', JSON.stringify({}), new Headers());

      expect(httpMock.put).toHaveBeenCalled();
      expect(httpMock.put).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(jasmine.any(Object)), jasmine.any(Headers));
    });

    it('should call the http.put once', () => {

      expect(httpMock.put).toHaveBeenCalled();
      expect(httpMock.put).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete function', () => {

    beforeEach(() => {
      httpMock.delete.and.returnValue(Observable.of({ json: () => [] }));
      apiService.delete('/claims/67');
    });

    it('should call http.delete with the right argument types', () => {
      httpMock.delete('/claims', new Headers());

      expect(httpMock.delete).toHaveBeenCalled();
      expect(httpMock.delete).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Headers));
    });

    it('should call the http.delete once', () => {

      expect(httpMock.delete).toHaveBeenCalled();
      expect(httpMock.delete).toHaveBeenCalledTimes(1);
    });
  });

});