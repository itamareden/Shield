import { Injectable } from '@angular/core';
import { State } from '../../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {

  counterStateKey = 'counterState';
  recordsStateKey = 'recordsStateKey';

  constructor() { }

  initState(): State {
    const counter = Number(window.localStorage.getItem(this.counterStateKey));
    const records = JSON.parse(window.localStorage.getItem(this.recordsStateKey)) || [];
    return { counter, records};
  }

  resetState() {
    window.localStorage.setItem(this.counterStateKey, null);
    window.localStorage.setItem(this.recordsStateKey, null);
  }

  updateCounter(counter: number) {
    const counterStr = JSON.stringify(counter);
    window.localStorage.setItem(this.counterStateKey, counterStr);
  }

  updateRecords(records: Array<string>) {
    const recordsStr = JSON.stringify(records);
    window.localStorage.setItem(this.recordsStateKey, recordsStr);
  }
}
