import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from 'libs/model/src/lib/user/user.interface';
import { IObject } from 'libs/model/src/lib/base/i-object.interface';

import { UserService } from '../services/user.service';
import { Repository } from '../repositories/repository-model';



/**
 * Base Repository Factory for repositories.
 */
export abstract class BaseDataProvider
{
  constructor(protected _db: AngularFirestore,
              protected _userService: UserService<User>)
  {}

  protected _createRepo<T extends IObject>(collectionName: any) {
    return new Repository<T>(collectionName, this._db, this._userService);
  }
}
