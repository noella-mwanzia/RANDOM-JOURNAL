import { AngularFirestore } from '@angular/fire/compat/firestore';


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
