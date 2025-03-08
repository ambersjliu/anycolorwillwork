import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export type RoundState = 'before' | 'after'

@Injectable({
  providedIn: 'root'
})

export class RoundStateService {

  constructor() { }

  private stateSubject = new BehaviorSubject<RoundState>('before');

  state$ = this.stateSubject.asObservable();

  setState(s: RoundState){
    this.stateSubject.next(s);
  }

  getState(): RoundState{
    return this.stateSubject.getValue();
  }
}
