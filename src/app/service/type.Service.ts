import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private typeSource = new BehaviorSubject<string>('');
  currentType = this.typeSource.asObservable();

  constructor() { }

  changeType(type: string) {
    this.typeSource.next(type);
  }
}
