import { Injectable } from '@angular/core';
import { RoundResult } from '../../interfaces/round-result';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private totalRounds = 0;
  private currentRound: number = 0;
  private results: RoundResult[] = [];
  private totalScore: number = 0;

  constructor() { }

  setTotalRounds(n: number){
    this.totalRounds = n;
  }

  startGame(){

  }

  submitRound(){

  }


  reset(){
    this.currentRound = 0;
    this.results = [];
    this.totalScore = 0;
  }
}
