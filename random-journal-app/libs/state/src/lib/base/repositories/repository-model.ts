import { Observable, from } from 'rxjs';
import { map, catchError, take, mergeMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IObject } from 'libs/model/src/lib/base/i-object.interface';
import { User } from 'libs/model/src/lib/user/user.interface';

import { UserService } from '../services/user.service';

/** This class is the central point of access to the database.
 * It contains all CRUD methods required for a db operation.
 */

export class Repository<T extends IObject> {
  
  constructor(protected _collectionName: string,
              protected _db: AngularFirestore,
              protected _userService: UserService<User>)
  { }


  /** @param id of document to be retrieved. */
  public getDocumentById(id: string): Observable<T> {
    return this._db.collection(this._collectionName)
                   .doc(id).snapshotChanges()
                   .pipe(map(d => {
                      const obj = <T> d.payload.data();
                      if(obj) {
                        obj.id = id;
                        return obj;
                      }
                      else
                        return obj;
                    }));
  }

  //Retrieves all documents from a collection
  public getDocuments(): Observable<T[]> {

    return <Observable<T[]>>
      this._db.collection<T>(this._collectionName)
              .snapshotChanges()
              .pipe(map(this._mergeWithDocId));
  }

  /**
   * Creates a document and returns an active document (with DB id attached)
   *
   * @param t
   */
  public create(t: any, setId?: string): Observable<T>
  {
    t.createdOn = new Date();

    const query = this._userService
                      .getUserId()
                      .pipe(take(1),
                            mergeMap(uid =>
                            {
                              t.createdBy = uid;
                              // Turn promise into observable
                              return from(this._db.collection<T>(this._collectionName).add(t));
                            }),
    );

    return query.pipe(map((r, i) => { t.id = r.id; return t; }),
                      catchError(e => { throw new Error(e.message); }));
  }

  /** Update document
   * @param t
   */
  public update(t: T): Observable<T>
  {
    if (!t.id)
      throw new Error("Trying to update POJO-object. Need active document with database id.");

    t.updatedOn = new Date();

    return from(this._db.collection(this._collectionName)
                        .doc(t.id)
                        .update(t))
                        .pipe(take(1),
                              map(() => t),
                              catchError(e => { throw new Error(e.message ); }));
  }

  /** Do a write operation
   * @param t - obj
   * @param id - document Id
   */
  public write(t: T, id: string): Observable<T>
  {
    t.id = id;
    if(!t.createdOn)
      t.createdOn = new Date();
    else
      t.updatedOn = new Date();

    return from(this._db.collection(this._collectionName)
                        .doc(t.id)
                        .set(t))
                        .pipe(take(1),
                              map(() => t),
                              catchError(e => { throw new Error(e.message ); }));
  }

  public delete(t: T): Observable<T>
  {
    if (!t.id)
      throw new Error("Trying to update POJO-object. Need active document with database id.");

    return from(this._db.collection(this._collectionName)
                        .doc(t.id)
                        .delete())
                        .pipe(take(1),
                              map(() => t),
                              catchError(e => { throw new Error(e.message ); }));
  }

  /** By default, Firebase does not store document id. I therefore merge documents with their id. */
  private _mergeWithDocId(actions: any[]) : T[]
  {
    return actions.map(a => {
      const data = <T> a.payload.doc.data();
      if(data)
        data.id = a.payload.doc.id;

      return data;
    });

  }

}
