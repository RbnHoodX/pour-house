import { Dispensation } from './dispensation';

export class Keg {
  private _name: string;
  private _capacity: number;
  private _dispensations: Dispensation[] = [];

  constructor(name: string, capacity: number) {
    this._name = name;
    this._capacity = capacity;
  }

  get name(): string {
    return this._name;
  }

  get capacity(): number {
    return this._capacity;
  }

  get remaining(): number {
    let used = 0;
    for (const d of this._dispensations) {
      used += d.amount;
    }
    return this._capacity - used;
  }

  _addDispensation(dispensation: Dispensation): void {
    this._dispensations.push(dispensation);
  }

  dispensations(): Dispensation[] {
    return [...this._dispensations];
  }
}
