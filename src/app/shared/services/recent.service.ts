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
  private a: HTMLAnchorElement;
  private input: HTMLInputElement;
  recent$: Observable<Array<Setup>> = this._recent$.asObservable();

  constructor() {
    this.a = document.createElement('a');
    this.input = document.createElement('input');
    if (this._localStorageAvailable) {
      this._recent = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
      this._recent$.next(this._recent);
    }

    this.recent$.subscribe(recent => {
      if (this._localStorageAvailable) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recent));
      }
    });
  }

  addToRecent(setup: Setup): void {
    if (!setup.name || !setup.time) {
      return;
    }
    this._recent = [setup, ...this._recent.filter(r => r.name !== setup.name)];
    this._recent = this._recent.slice(-10);
    this._recent$.next(this._recent);
  }

  saveRecents(): void {
    const file = new Blob([JSON.stringify(this._recent)], { type: 'text/json'});
    this.a.href = URL.createObjectURL(file);
    this.a.download = 'recents.json';
    this.a.click();
    URL.revokeObjectURL(this.a.href);
  }

  loadRecents(): void {
    this.input.type = 'file';
    this.input.click();
    this.input.addEventListener('change', () => {
      if (!this.input.files[0]) {
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = e => {
          this._recent = JSON.parse((e.currentTarget as FileReader).result);
          this._recent$.next(this._recent);
      };
      fileReader.readAsText(this.input.files[0]);
    });
  }
}
