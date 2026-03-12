import { Keg } from './keg';
import { Tab } from './tab';
import { Dispensation, BarLog } from './dispensation';

export class TapHouse {
  private _kegs: Map<string, Keg> = new Map();
  private _tabs: Map<string, Tab> = new Map();
  private _barLog: BarLog = new BarLog();

  createKeg(name: string, capacity: number): Keg {
    if (this._kegs.has(name)) {
      throw new Error(`keg '${name}' already exists`);
    }
    const keg = new Keg(name, capacity);
    this._kegs.set(name, keg);
    return keg;
  }

  getKeg(name: string): Keg {
    const keg = this._kegs.get(name);
    if (!keg) {
      throw new Error(`keg '${name}' not found`);
    }
    return keg;
  }

  openTab(name: string, limit: number): Tab {
    if (this._tabs.has(name)) {
      throw new Error(`tab '${name}' already exists`);
    }
    const tab = new Tab(name, limit);
    this._tabs.set(name, tab);
    return tab;
  }

  getTab(name: string): Tab {
    const tab = this._tabs.get(name);
    if (!tab) {
      throw new Error(`tab '${name}' not found`);
    }
    return tab;
  }

  kegs(): Keg[] {
    return [...this._kegs.values()];
  }

  tabs(): Tab[] {
    return [...this._tabs.values()];
  }

  pour(kegName: string, tabName: string, amount: number, memo: string = ''): Dispensation {
    if (amount <= 0) {
      throw new Error('amount must be positive');
    }
    const keg = this.getKeg(kegName);
    const tab = this.getTab(tabName);
    const entry = new Dispensation(keg, tab, amount, memo);
    this._barLog.record(entry);
    return entry;
  }

  logEntries(): Dispensation[] {
    return this._barLog.entries();
  }

  totalPoured(): number {
    let total = 0;
    for (const d of this._barLog.entries()) {
      total += d.amount;
    }
    return total;
  }
}
