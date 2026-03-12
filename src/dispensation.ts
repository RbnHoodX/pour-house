import { Keg } from './keg';
import { Tab } from './tab';

export class Dispensation {
  private _id: number = 0;
  private _keg: Keg;
  private _tab: Tab;
  private _amount: number;
  private _memo: string;

  constructor(keg: Keg, tab: Tab, amount: number, memo: string = '') {
    this._keg = keg;
    this._tab = tab;
    this._amount = amount;
    this._memo = memo;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get keg(): Keg {
    return this._keg;
  }

  get tab(): Tab {
    return this._tab;
  }

  get amount(): number {
    return this._amount;
  }

  get memo(): string {
    return this._memo;
  }
}

export class BarLog {
  private _entries: Dispensation[] = [];
  private _counter: number = 0;

  record(dispensation: Dispensation): Dispensation {
    this._counter += 1;
    dispensation.id = this._counter;
    this._entries.push(dispensation);
    dispensation.keg._addDispensation(dispensation);
    dispensation.tab._addDispensation(dispensation);
    return dispensation;
  }

  entries(): Dispensation[] {
    return [...this._entries];
  }
}
