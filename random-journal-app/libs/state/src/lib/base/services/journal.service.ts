import { Injectable } from "@angular/core";

import { User } from "libs/model/src/lib/user/user.interface";
import { Journal } from "libs/model/src/lib/journal.interface";
import { DataProvider } from "../data/data.provider";
import { Repository } from "../repositories/repository-model";
import { UserService } from "./user.service";
import { map, switchMap } from "rxjs/operators";

/**
 * Service that makes all interactions with the db for journals
 */

@Injectable()

export class JournalEntriesService<T extends Journal>
{

  constructor(private _dataProvider: DataProvider,
              private _userService: UserService<User>)
  {
  }

  getUserJournals()
  {
    const activeUser$ = this._userService.getUser();

    return activeUser$.pipe(switchMap(user => this._dataProvider.getRepo<Journal>(`journals/${user.id}/entries`).getDocuments()));
  }

  createJournalEntry(entry: Journal)
  {
    const activeUser$ = this._userService.getUser();

    return activeUser$.pipe(switchMap(user => this._dataProvider.getRepo<Journal>(`journals/${user.id}/entries`).create(entry)));
  }

}
