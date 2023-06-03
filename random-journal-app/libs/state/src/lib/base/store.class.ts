import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';
import { Stateful } from './stateful.interface';

export type StoreEventTypes = 'Not Specified' | 'Create' | 'Update' | 'Delete' | string;

/** This class forms the basis of statemanagent by
 * being the single source of truth for data queried
 * from various collections on the db,
 */

@Injectable()
export abstract class Store<T> implements Stateful<T>, OnDestroy
{
  protected _sbS = new SubSink();

  protected bs: BehaviorSubject<T>;
  protected state$: Observable<T>;

  state: T;
  previous: T[] = [];

  protected abstract store: string;

  constructor(initialValue: Partial<T>)
  {
    this.bs = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.bs.asObservable();

    this.state = initialValue as T;
    this._sbS.sink = this.state$.subscribe(s => { this.state = s; });
  }

  //Method that gets state
  get(): Observable<T> {
    return this.bs.asObservable();
  }

  //Method that sets state
  protected set(newValue: Partial<T>, event: StoreEventTypes = "Not Specified")
  {
    this.previous.unshift(this.state);
    const newState = Object.assign({}, newValue) as T;

    console.groupCollapsed(`[${this.store} store] [set] [event: ${event}]`);

    this.bs.next(newState);
  }

  ngOnDestroy() {
    this._sbS.unsubscribe();
  }
}
