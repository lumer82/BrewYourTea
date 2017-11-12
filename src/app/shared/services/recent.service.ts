import { Observable } from 'rxjs/Observable';
import { Setup } from './../models/setup.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isNullOrUndefined } from 'util';

@Injectable()
export class RecentService {

  private readonly STORAGE_KEY = 'recent';
  private _localStorageAvailable = 'localStorage' in window;
  private _recent: Array<Setup> = [];
  private _recent$ = new BehaviorSubject<Array<Setup>>([]);
  recent$: Observable<Array<Setup>> = this._recent$.asObservable();

  constructor() {
    if (this._localStorageAvailable) {
      this._recent = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
      this._recent$.next(this._recent);
    }
  }

  addToRecent(setup: Setup): void {
    if (!setup.name || !setup.time) {
      return;
    }
    this._recent = [setup, ...this._recent.filter(r => r.name !== setup.name)];
    this._recent = this._recent.slice(-10);
    this._recent$.next(this._recent);
    if (this._localStorageAvailable) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._recent));
    }
  }
}
