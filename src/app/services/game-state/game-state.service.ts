import { inject, Injectable } from '@angular/core';
import { RoundResult } from '../../interfaces/round-result';
import { ColorService } from '../color-service/color.service';
import { RGB } from '../../interfaces/rgb';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private totalRounds = 0;
  // private currentRound: number = 0;
  private results: RoundResult[] = [];
  // private totalScore: number = 0;

  private currentRoundSubject = new BehaviorSubject<number>(0); // Observable for current round
  private totalScoreSubject = new BehaviorSubject<number>(0);   // Observable for total score
  private contextColorSubject = new BehaviorSubject<RGB>({ r: 0, g: 0, b: 0 }); // Observable for context color
  private targetColorSubject = new BehaviorSubject<RGB>({ r: 0, g: 0, b: 0 });  // Observable for target color

  currentRound$ = this.currentRoundSubject.asObservable();
  totalScore$ = this.totalScoreSubject.asObservable();
  contextColor$ = this.contextColorSubject.asObservable();
  targetColor$ = this.targetColorSubject.asObservable();

  private colorService: ColorService = inject(ColorService);

  // Store context and target colors
  // currentContextColor: RGB = { r: 0, g: 0, b: 0 };
  // currentTargetColor: RGB = { r: 0, g: 0, b: 0 };

  constructor() { }

  //getters setters 

  // Set the total rounds
  setTotalRounds(n: number) {
    this.totalRounds = n;
  }

  // // Get the current round number
  // getCurrentRound() {
  //   return this.currentRound;
  // }

  getTotalRounds(){
    return this.totalRounds
  }

  // getTotalScore() {
  //   return this.totalScore;
  // }

  // other methods

  // nextRound() {
  //   if (!this.isGameFinished()) {
  //     this.currentRound++;

  //     this.currentContextColor = this.colorService.getRandomColor();
  //     this.currentTargetColor = this.colorService.getRandomColor();
  //   }
  // }

  // getRoundColors(): { context: RGB, target: RGB } {
  //   return { context: this.currentContextColor, target: this.currentTargetColor };
  // }

  // submitRound(baseColor: string, overlayColor: string, opacity: number) {
  //   const baseColorToRGB: RGB = this.colorService.hexToRGB(baseColor);
  //   const overlayColorToRGB: RGB = this.colorService.hexToRGB(overlayColor);
  //   const opacityNormalized = parseFloat((opacity / 100).toPrecision(3));
  //   const blendedColor: RGB = this.colorService.blendColors(baseColorToRGB, overlayColorToRGB, opacityNormalized);

  //   const distance = this.colorService.calculateColorDistance(baseColorToRGB, overlayColorToRGB);
  //   const score = distance < 15 ? 1 : 0;
  //   this.totalScore += score;

  //   const result: RoundResult = {
  //     contextColor: this.currentContextColor,
  //     targetColor: this.currentTargetColor,
  //     baseColor: baseColorToRGB,
  //     overlayColor: overlayColorToRGB,
  //     opacity: opacityNormalized,
  //     finalColor: blendedColor,
  //     score: score,
  //     distance: distance
  //   }

  //   this.results.push(result);
  //   if (!this.isGameFinished()){
  //     this.nextRound();
  //   }

  // }

  // // Reset the game
  // reset() {
  //   this.currentRound = 0;
  //   this.results = [];
  //   this.totalScore = 0;
  // }

  // // Check if the game is finished
  // isGameFinished(): boolean {
  //   return this.currentRound > this.totalRounds;
  // }
  nextRound() {
    if (!this.isGameFinished()) {
      const nextRound = this.currentRoundSubject.value + 1;
      this.currentRoundSubject.next(nextRound);

      const contextColor = this.colorService.getRandomColor();
      const targetColor = this.colorService.getRandomColor();
      this.contextColorSubject.next(contextColor);
      this.targetColorSubject.next(targetColor);
    }
  }

  submitRound(baseColor: string, overlayColor: string, opacity: number) {
    const baseColorToRGB = this.colorService.hexToRGB(baseColor);
    const overlayColorToRGB = this.colorService.hexToRGB(overlayColor);
    const opacityNormalized = parseFloat((opacity / 100).toPrecision(3));
    const blendedColor = this.colorService.blendColors(baseColorToRGB, overlayColorToRGB, opacityNormalized);

    const distance = this.colorService.calculateColorDistance(baseColorToRGB, overlayColorToRGB);
    const score = distance < 15 ? 1 : 0;
    const totalScore = this.totalScoreSubject.value + score;
    this.totalScoreSubject.next(totalScore);

    const result: RoundResult = {
      contextColor: this.contextColorSubject.value,
      targetColor: this.targetColorSubject.value,
      baseColor: baseColorToRGB,
      overlayColor: overlayColorToRGB,
      opacity: opacityNormalized,
      finalColor: blendedColor,
      score,
      distance,
    };

    this.results.push(result);
    if (!this.isGameFinished()) {
      this.nextRound();
    }
  }

  reset() {
    this.currentRoundSubject.next(0);
    this.totalScoreSubject.next(0);
    this.results = [];
  }

  isGameFinished(): boolean {
    return this.currentRoundSubject.value > this.totalRounds;
  }

}
