import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IndexedDbService } from './indexed-db.service';
import { Store } from '@ngrx/store';
import { getClaimsSummaryIds } from '../../workflow/_reducers/index';
import * as fromWorkflow from '../../workflow/_reducers';
import { CryptoService } from './_crypto.service';

@Injectable()
export class SessionStorageService {
  claimIds$: Observable<any>;
  constructor(public db: IndexedDbService,
              public crypto: CryptoService,
    private _store: Store<fromWorkflow.State>) {
    this.claimIds$ = this._store.select<number[] | string[]>(getClaimsSummaryIds);
  }



  // All reads of claims and jobs are performed on sessionStorage
  // Query by property predicate
  queryByProp(predicate: (obj: any) => boolean): Observable<any> {
    const claims = [];
    return this.claimIds$
      .map(ids => {
        for (const id of ids) {
          const data = JSON.parse(sessionStorage.getItem(id.toString()));
          claims.push(data);
        }
        return claims;
      })
      .map(objs => {
        const filtered = [];
        for (const obj of objs) {
          const valid = predicate(obj);
          if (valid) {
            filtered.push(obj);
          }
        }
        return filtered;
      });
  }

  // Query by Id
  queryById(predicate: (obj: any) => boolean): Observable<any> {
    const claims = [];
    return this.claimIds$
      .map(ids => {
        for (const id of ids) {
          if (predicate(id)) {
            const data = JSON.parse(sessionStorage.getItem(id.toString()));
            claims.push(data);
          }
        }
        return claims;
      });
  }

   getAllClaimsFromSessionStorage(): Observable<any> {
    const claimList = [];
    return this.claimIds$
      .map(ids => {
        for (const id of ids) {
          const claim = JSON.parse(sessionStorage.getItem(id));
          claimList.push(claim);
        }
        return claimList;
      });
  }

          // TODOS //

  createClaim(claimObject: any) {
    this.db.transaction('rw', this.db.claims, () => {
      // add new claim object to:
      // 1. Server (add raw)
                // Note:
                  //  * Adding it to the server first will let us get the primary key from the server before adding to indexedDB and session
                  // * However with websocket, we don't need to do http call everytime. We just sync indexedDB to Server with two way com.
                  // * But if we do this, then client will be responsible for creating unique keys to send object to indexedDB to server.
                  // * We have to then fall on guid uuids as our primary key then.
        // then

      // 2. IndexedDB (encrypt and add)
      this.crypto.encryptWithAesCbcKey(claimObject)
      .then((cipher) => {
        const cipherObject = { id: claimObject.id, cipher: cipher };
         this.db.claims.add(cipherObject);
              return cipherObject;
      })
      .then((obj) => {
        // 3. session storage (decrypt from indexeddb and add to session storage)
        this.crypto.decryptWithAesCbcKey(obj.cipher)
        .then(val => {
          // then add to sessionStorage
          sessionStorage.setItem(`${obj.id}`, val);
        });
      });

    })
      .then(() => { })
      .catch(() => { });
  }

  updateClaim(id: number, changes: any) {
    this.db.transaction('rw', this.db.claims, () => {
      // update claim object to:
      // 1. Server
      // 2. IndexedDB (decrypt, update, encrypt and add)
      // 3. Session storage
    })
      .then(() => { })
      .catch(() => { });
  }

  deleteOrFlagClaim(id: number) {
    this.db.transaction('rw', this.db.claims, () => {
      // delete claim from:
      // 1. session storage
      // 2. Indexed DB
      // 3. Server
    });
  }


}
