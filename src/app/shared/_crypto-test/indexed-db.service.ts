import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class IndexedDbService extends Dexie {

    keys: Dexie.Table<{id: string, blob: Blob}, string>;
    claims: Dexie.Table<{id: number, cipher: string}, number>;
    customers: Dexie.Table<{id?: number, cipher: string}, number>;
    constructor() {
        super('ThinClientDb');
        this.version(1).stores({
            keys: 'id',
            claims: 'id',
            customers: '++id'
        });
    }
}
