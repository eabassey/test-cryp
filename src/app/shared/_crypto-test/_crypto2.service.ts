import { Injectable, Inject } from '@angular/core';
import { Util } from './_util';
import { AES_CBC_KEY_NAME, INIT_VECTOR } from './config';
import { IndexedDbService } from './indexed-db.service';



@Injectable()
export class Crypto2Service {


  /////////////////// Blob to keep Aes Key and IV///////////////////
  reader = new FileReader;



  constructor(
    private db: IndexedDbService,
    @Inject(AES_CBC_KEY_NAME) private aesKey: string,
    @Inject(INIT_VECTOR) private ivName: any
  ) { }


  createKeyAsBlobToIndexedDb(credentialObject: any) {

    const iterations = 1000000;   // Longer is slower... hence stronger
    const saltString = 'This is my salt. I need more pepper and tomatoes to spice up..';
    const saltBytes = Util.stringToByteArray(saltString);

    // Get byteArray of credentials, IV, and Hash
    const credentialsString = JSON.stringify(credentialObject);
    const credentialBytes = Util.stringToByteArray(credentialsString);
    const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));

    // deriveKey needs to be given a base key. This is just a
    // CryptoKey that represents the starting passphrase.
    return window.crypto.subtle.importKey(
      'raw',
      credentialBytes,
      { name: 'PBKDF2' }
      ,
      false,
      ['deriveKey']
    )
      .then((baseKey) => {
        return window.crypto.subtle.deriveKey(
          // Firefox currently only supports SHA-1 with PBKDF2
          { name: 'PBKDF2', salt: saltBytes, iterations: iterations, hash: 'SHA-1' },
          baseKey,
          { name: 'AES-CBC', length: 256 }, // Resulting key type we want
          true,
          ['encrypt', 'decrypt']
        );
      })
      .then(aesCbcKey => {
        // Export to ArrayBuffer
        return window.crypto.subtle.exportKey(
          'raw',
          aesCbcKey
        );
      })
      .then((keyBuffer) => {
        const keybytes = new Uint8Array(keyBuffer, 0, 16);
        this.hashCredentialsToArrayBuffer(credentialObject)
          .then(buffer => {
            const hashBytes = new Uint8Array(buffer, 0, 16);

            // Build a Blob with the 16-byte IV followed by the ciphertext
            const blob = new Blob(
              [ivBytes, keybytes, hashBytes],
              { type: 'application/octet-stream' }
            );
            // Store keys blob in indexedDB
            this.db.keys.add({ id: 'most-wanted', blob: blob });
          });
      });


    // this.reader.onload = this.encryptReadFile;
    // reader.readAsArrayBuffer(file);
  }

  // -- encrypt data
  encryptWithAesCbcKey(object: any) {
    const objectString = JSON.stringify(object);
    const objectBytes = Util.stringToByteArray(objectString);

    // Start by getting Key  and IV from blob as bytes
    return this.db.keys.get('most-wanted')
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
            ['encrypt']
          )
            .then((key) => {
              // Use the CryptoKey to encrypt the plaintext
              return window.crypto.subtle.encrypt(
                { name: 'AES-CBC', iv: ivBytes },
                key,
                objectBytes
              );
            })
            .then((cipherBuffer) => {
              // Encode cipherBuffer to base 64 to be put in IndexedDB
              const cipherBytes = new Uint8Array(cipherBuffer);
              const base64Ciphertext = Util.byteArrayToBase64(cipherBytes);

              this.db.claims.add({ id: object.id, cipher: base64Ciphertext })
                .catch(err => console.log(`You landed an error: ${err}`));
            });
        };

        // ultimately we read from the blob
        reader.readAsArrayBuffer(keyBlobObject.blob);

      });

  }



  // -- decrypt data
  decryptWithAesCbcKey(cipherText) {
    // cipher conversion
    const cipherBytes = Util.base64ToByteArray(cipherText);

    // Start by getting Key  and IV from blob as bytes
    return this.db.keys.get('most-wanted')
      .then(keyBlobObject => {

        // create reader to read blob contents
        const reader = new FileReader();
        reader.onload = () => {
          const ivBytes = new Uint8Array(reader.result.slice(0, 16));
          const keyBytes = new Uint8Array(reader.result.slice(16, 32));
          console.log('bytes', ivBytes, keyBytes);
          // Make a CryptoKey from the Key string
          return window.crypto.subtle.importKey(
            'raw',
            keyBytes,
            { name: 'AES-CBC', length: 256 },
            false,
            ['decrypt']
          )
            .then((key) => {
              // Use the CryptoKey and IV to decrypt the cipher
              return window.crypto.subtle.decrypt(
                { name: 'AES-CBC', iv: ivBytes },
                key,
                cipherBytes
              );
            })
            .then((cipherBuffer) => {
              const plaintextBytes = new Uint8Array(cipherBuffer);
              // console.log(plaintextBytes);
              const plaintextString = Util.byteArrayToString(plaintextBytes);

              const jsonData = JSON.parse(plaintextString);
              // claims.push(jsonData);

              // encrypting into sessionStorage
              // sessionStorage.setItem(`${jsonData.id}`, plaintextString);
            });
        };

        // ultimately we read from the blob
        reader.readAsArrayBuffer(keyBlobObject.blob);
        // return claims;
      });

  }

  // 2. Using Password to Generate CryptoKey
  // Yield a Promise of a 256-bit AES-CBC CryptoKey
  createKeyFromCredentials(credentialString) {
    const iterations = 1000000;   // Longer is slower... hence stronger
    const saltString = 'This is my salt. I need more pepper and tomatoes to spice up..';
    const saltBytes = Util.stringToByteArray(saltString);
    const passphraseBytes = Util.stringToByteArray(credentialString);

    // deriveKey needs to be given a base key. This is just a
    // CryptoKey that represents the starting passphrase.
    return window.crypto.subtle.importKey(
      'raw',
      passphraseBytes,
      { name: 'PBKDF2' }
      ,
      false,
      ['deriveKey']
    )
      .then((baseKey) => {
        return window.crypto.subtle.deriveKey(
          // Firefox currently only supports SHA-1 with PBKDF2
          { name: 'PBKDF2', salt: saltBytes, iterations: iterations, hash: 'SHA-1' },
          baseKey,
          { name: 'AES-CBC', length: 256 }, // Resulting key type we want
          true,
          ['encrypt', 'decrypt']
        );
      })
      .then(aesCbcKey => {
        // Export to ArrayBuffer
        return window.crypto.subtle.exportKey(
          'raw',
          aesCbcKey
        );
      })
      .then((buf) => {
        // Cast to a byte array, place in Key field
        const byteArray = new Uint8Array(buf);
        return Util.byteArrayToHexString(byteArray);
      });
  }


  // local method
  private hashCredentialsToArrayBuffer(credentials: object) {
    const credentialsString = JSON.stringify(credentials);
    // Get byteArray of credentials string
    const credentialBytes = Util.stringToByteArray(credentialsString);
    return window.crypto.subtle.digest(
      { name: 'SHA-512' },
      credentialBytes
    );
  }



  clearSessionStorage() {
    sessionStorage.clear();
  }

  clearSessionStorageAndKey() {
    sessionStorage.clear();
    this.db.keys.clear();
  }



  // ON PASSWORD CHANGE / DELETING KEY or IV FROM LOCALSTORAGE
  initializeAtStart() {
    // New AES-CBC Key  and IV will be generated as blob on successful login inside authentication effects.
    // If keys blob is not available, delete DB and regenerate new blob.

    if (!this.keyBlobAvailable) {
      this.recreateDB();
    }

  }

   recreateDB() {
    return this.db.delete().then(() => this.db.open());
  }

  // get userIsSame(): boolean {
  //   return localStorage.getItem('same-user') === 'true';
  // }



  // Checking for keys blob in indexedDB
  private get keyBlobAvailable(): boolean {
    return !!this.db.keys.get('most-wanted');
  }

  // checkOwnerOfCurrentDb(userObject) {

  //   // Start by getting Key  and IV from blob as bytes
  //   return this.db.keys.get('most-wanted')
  //     .then(keyBlobObject => {
  //       // create reader to read blob contents
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const existingHashBytes = new Uint8Array(reader.result.slice(32));

  //         // SHA-512 of incoming userObject
  //         this.hashCredentialsToArrayBuffer(userObject)
  //           .then(buffer => {
  //             const incomingHashBytes = new Uint8Array(buffer, 0, 16);

  //             // check if Hashes are equal
  //             if (existingHashBytes === incomingHashBytes) {
  //               localStorage.setItem('same-user', 'true');
  //             } else {
  //               localStorage.setItem('same-user', 'false');
  //             }
  //           });
  //       };

  //       // ultimately we read from the blob
  //       reader.readAsArrayBuffer(keyBlobObject.blob);

  //     });
  // }






  // 3. Using Private & Public Keys with Server Communication



}
