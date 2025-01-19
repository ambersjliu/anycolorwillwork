import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ViewState = 'game' | 'summary' | 'home';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  
  constructor() { }

  private stateSubject = new BehaviorSubject<ViewState>('home');

  state$ = this.stateSubject.asObservable();

  setState(s: ViewState){
    this.stateSubject.next(s);
  }

  getState(): ViewState{
    return this.stateSubject.getValue();
  }
}
