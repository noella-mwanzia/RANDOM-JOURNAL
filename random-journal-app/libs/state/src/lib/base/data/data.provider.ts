import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

/**
 * Service that creates repositories.
 *
 * Use: Have single point of database table configuration.
 */
@Injectable({ providedIn: 'root' })
export class DataProvider extends BaseDataProvider
{
  constructor(_db: AngularFirestore)
  { super(_db); }

  
   /*
   * @param collectionName: The collection name.
   */
  getRepo<T extends IObject>(collectionName) {
    return this._createRepo<T>(collectionName);
  }
}
