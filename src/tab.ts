import { Dispensation } from './dispensation';

export class Tab {
  private _name: string;
  private _limit: number;
  private _dispensations: Dispensation[] = [];

  constructor(name: string, limit: number) {
    this._name = name;
    this._limit = limit;
  }

  get name(): string {
    return this._name;
  }

  get limit(): number {
    return this._limit;
  }

  get balance(): number {
    let total = 0;
    for (const d of this._dispensations) {
      total += d.amount;
    }
    return total;
  }

  _addDispensation(dispensation: Dispensation): void {
    this._dispensations.push(dispensation);
  }

  dispensations(): Dispensation[] {
    return [...this._dispensations];
  }
}
