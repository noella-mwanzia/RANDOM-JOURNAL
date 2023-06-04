import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { BaseDataProvider } from './base.data-provider';
import { UserService } from '../services/user.service';
import { User } from 'libs/model/src/lib/user/user.interface';
import { IObject } from 'libs/model/src/lib/base/i-object.interface';

/**
 * Service that creates repositories.
 *
 * Use: Have single point of database table configuration.
 */
@Injectable({ providedIn: 'root' })
export class DataProvider extends BaseDataProvider
{
  constructor(_db: AngularFirestore,
              _userService: UserService<User>)
  { super(_db, _userService); }

  
   /*
   * @param collectionName: The collection name.
   */
  getRepo<T extends IObject>(collectionName: string) 
  {
    return this._createRepo<T>(collectionName);
  }
}
