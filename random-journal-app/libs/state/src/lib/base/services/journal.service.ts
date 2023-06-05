import { Injectable } from "@angular/core";

import { User } from "libs/model/src/lib/user/user.interface";
import { Journal } from "libs/model/src/lib/journal.interface";
import { DataProvider } from "../data/data.provider";
import { Repository } from "../repositories/repository-model";
import { UserService } from "./user.service";
import { map, switchMap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

/**
 * Service that makes all interactions with the db for journals
 */

@Injectable()

export class JournalEntriesService<T extends Journal>
{

  constructor(private _dataProvider: DataProvider,
              private _afAuth: AngularFireAuth,
              protected _db: AngularFirestore,
              private _userService: UserService<User>)
  {
  }

  getUserJournals()
  {
    const activeUser$ = this._userService.getUser();

    return this._afAuth.authState.pipe(switchMap(user => this._db.collection(`journals/${user!.uid}/entries`).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    )));
  }

  createJournalEntry(entry: Journal)
  {
    return this._afAuth.authState.pipe(switchMap(user => {
      return this._db.collection(`journals/${user!.uid}/entries`).add({...entry, createdBy:user!.uid, createdOn:new Date()})
    }));
  }

}
