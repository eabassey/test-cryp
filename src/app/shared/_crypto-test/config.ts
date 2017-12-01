import { InjectionToken } from '@angular/core';


// Injection Tokens

// --aes key
export const AES_CBC_KEY_NAME = new InjectionToken<string>('AES_CBC_KEY_NAME');

// -- iv
export const INIT_VECTOR = new InjectionToken<any>('INIT_VECTOR');
