import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Errors } from '../../shared/models/errors';
import { Store } from '@ngrx/store';
import * as ClaimsSummaryActions from '../_actions/claims-summary.actions';
import * as JobcardActions from '../_actions/job-cards.actions';
import * as fromWorkflow from '../_reducers';
import { selectAllClaimsSummary, getClaimsSummaryIds } from '../_reducers';
import { IndexedDbService } from '../../shared/_crypto-test/indexed-db.service';
import { CryptoService } from '../../shared/_crypto-test/_crypto.service';
import { SessionStorageService } from '../../shared/_crypto-test/session-storage.service';
import { Crypto2Service } from '../../shared/_crypto-test/_crypto2.service';
import { Util } from '../../shared/_crypto-test/_util';








@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})
export class WorkflowListComponent implements OnInit {

  sessionQueryById$: Observable<any>;
  sessionQueryByProp$: Observable<any>;

  theClaims = [];
  viewClaimSessionStorage = [];
  claimIds$: Observable<any>;
  singleClaim$: Observable<any>;
  claims$: Observable<any>;
  isSubmitting = false;
  errors$: Observable<Object>;

  constructor(
    private db: IndexedDbService,
    private crypto: CryptoService,
    private crypto2: Crypto2Service,
    private _router: Router,
    private _store: Store<fromWorkflow.State>,
    private sessionDb: SessionStorageService
  ) {
  }

  ngOnInit() {
    this._store.dispatch(new ClaimsSummaryActions.GetAllClaims());
    this.claims$ = this._store.select(selectAllClaimsSummary);
    this.claimIds$ = this._store.select<number[] | string[]>(getClaimsSummaryIds);
  }



  querySessionStorageByProp() {
    const startTime = new Date().getTime();
    this.sessionQueryByProp$ = this.sessionDb.queryByProp(c => c.suburb === 'Craighall Park' ||
      c.suburb === 'sea park');
    console.log(`Session storage simple query by prop: ${new Date().getTime() - startTime}`);
  }

  querySessionStorageById() {
    const startTime = new Date().getTime();
    this.sessionQueryById$ = this.sessionDb.queryById(id => id < 2000);
    console.log(`Session storage simple query by Id (optimized): ${new Date().getTime() - startTime}`);
  }

  // method 1
  encryptAndAddAllClaimsToIndexedDB() {
    const startTime = new Date().getTime();
    this.claims$
      .map((claims) => {
        for (const claim of claims) {
          this.crypto.encryptWithAesCbcKey(claim)
            .then((cipher) => {
              this.db.claims.add({ id: claim.id, cipher: cipher })
                .catch(err => console.log(`You landed an error: ${err}`));
            });
        }
      })
      .do(x => console.log(`Encrypt and add 1,110 claims to IndexedDB: ${(new Date().getTime()) - startTime} ms`))
      .subscribe();
  }

  // method 2
  encryptAndAddAllClaimsToIndexedDB2() {
    const startTime = new Date().getTime();
    this.claims$
      .map((claims) => {
        for (const claim of claims) {
          this.crypto2.encryptWithAesCbcKey(claim);
        }
      })
      .do(x => console.log(`Encrypt and add 1,110 claims to IndexedDB: ${(new Date().getTime()) - startTime} ms`))
      .subscribe();
  }

  // method 1
  decryptAndShowAllClaimsFromIndexedDB() {
    const startTime = new Date().getTime();
    this.db.claims.each(obj => {
      this.crypto.decryptWithAesCbcKey(obj.cipher)
        .then(val => {
          const jsonData = JSON.parse(val);
          this.theClaims.push(jsonData);

          // encrypting into sessionStorage
          sessionStorage.setItem(`${obj.id}`, val);
        });
    })
      .then(x => console.log(`Decrypt and get 1,110 claims from IndexedDB: ${(new Date().getTime()) - startTime} ms`));
  }

  // method 2
  decryptAndShowAllClaimsFromIndexedDB2() {
    const startTime = new Date().getTime();

    this.db.claims.toArray()
      .then(objs => {
        // Start by getting Key  and IV from blob as bytes
        this.db.keys.get('most-wanted')
          .then(keyBlobObject => {

            // create reader to read blob contents
            const reader = new FileReader();
            reader.onload = () => {
              const ivBytes = new Uint8Array(reader.result.slice(0, 16));
              const keyBytes = new Uint8Array(reader.result.slice(16, 32));

              // Make a CryptoKey from the Key string
              return window.crypto.subtle.importKey(
                'raw',
                keyBytes,
                { name: 'AES-CBC', length: 256 },
                false,
                ['decrypt']
              )
                .then((key) => {
                  // for each cipher object decrypt...
                  for (const obj of objs) {
                    // cipher conversion
                    const cipherBytes = Util.base64ToByteArray(obj.cipher);
                    // Use the CryptoKey and IV to decrypt the cipher
                    window.crypto.subtle.decrypt(
                      { name: 'AES-CBC', iv: ivBytes },
                      key,
                      cipherBytes
                    )
                      .then((cipherBuffer) => {
                        const plaintextBytes = new Uint8Array(cipherBuffer);

                        const plaintextString = Util.byteArrayToString(plaintextBytes);

                        const jsonData = JSON.parse(plaintextString);
                        this.theClaims.push(jsonData);
                        // decrypting into sessionStorage
                        sessionStorage.setItem(`${jsonData.id}`, plaintextString);
                      });
                  }

                });
            };

            // ultimately we read from the blob
            reader.readAsArrayBuffer(keyBlobObject.blob);

          });
      })
      .then(x => console.log(`Decrypt and get 1,110 claims from IndexedDB to session storage 2: ${(new Date().getTime()) - startTime} ms`));
  }

  // method 1
  viewClaimAtATimeFromIndexedDB() {
    Observable.interval(1000)
      .map(x => {
        return this.claimIds$.map(ids => {
          const id = ids[x];
          this.decryptAndGetClaimById(id); // local method
        });
      })
      .switch()
      .subscribe();
  }

  // method 2
  viewClaimAtATimeFromIndexedDB2() {
    Observable.interval(1000)
      .map(x => {
        return this.claimIds$.map(ids => {
          const id = ids[x];
          this.decryptAndGetClaimById(id); // local method
        });
      })
      .switch()
      .subscribe();
  }

  // method 1 local method (don't bind to this)
  private decryptAndGetClaimById(id) {
    this.db.claims.get(id)
      .then(obj => {
        this.crypto.decryptWithAesCbcKey(obj.cipher)
          .then(val => {
            const jsonData = JSON.parse(val);
            this.singleClaim$ = Observable.of(jsonData);
          });
      });
  }



  viewFromSessionStorage() {
    const startTime = new Date().getTime();
    this.sessionDb.getAllClaimsFromSessionStorage()
      .map(claims => this.viewClaimSessionStorage = claims)
      .subscribe(x =>
        console.log(`Populate view with 1,110 claims from sessionStorage: ${(new Date().getTime()) - startTime}`));
  }


  // TEST CREATE CLAIM
  createClaim() {
    this.sessionDb.createClaim({ id: 9, name: 'sample claim', type: 'geyser' });
  }

}

