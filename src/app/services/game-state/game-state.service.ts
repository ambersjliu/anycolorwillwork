import { inject, Injectable } from '@angular/core';
import { RoundResult } from '../../interfaces/round-result';
import { ColorService } from '../color-service/color.service';
import { RGB } from '../../interfaces/rgb';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private totalRounds = 0;
  private currentRound: number = 0;
  private results: RoundResult[] = [];
  private totalScore: number = 0;

  private colorService: ColorService = inject(ColorService);

  // Store context and target colors
  currentContextColor: RGB = { r: 0, g: 0, b: 0 };
  currentTargetColor: RGB = { r: 0, g: 0, b: 0 };

  constructor() { }

  //getters setters 

  // Set the total rounds
  setTotalRounds(n: number) {
    this.totalRounds = n;
  }

  // Get the current round number
  getCurrentRound() {
    return this.currentRound;
  }

  getTotalRounds(){
    return this.totalRounds
  }

  getTotalScore() {
    return this.totalScore;
  }

  // other methods

  nextRound() {
    if (!this.isGameFinished()) {
      this.currentRound++;

      this.currentContextColor = this.colorService.getRandomColor();
      this.currentTargetColor = this.colorService.getRandomColor();
    }
  }

  getRoundColors(): { context: RGB, target: RGB } {
    return { context: this.currentContextColor, target: this.currentTargetColor };
  }

  submitRound(baseColor: string, overlayColor: string, opacity: number) {
    const baseColorToRGB: RGB = this.colorService.hexToRGB(baseColor);
    const overlayColorToRGB: RGB = this.colorService.hexToRGB(overlayColor);
    const opacityNormalized = parseFloat((opacity / 100).toPrecision(3));
    const blendedColor: RGB = this.colorService.blendColors(baseColorToRGB, overlayColorToRGB, opacityNormalized);

    const distance = this.colorService.calculateColorDistance(baseColorToRGB, overlayColorToRGB);
    const score = distance < 15 ? 1 : 0;
    this.totalScore += score;

    const result: RoundResult = {
      contextColor: this.currentContextColor,
      targetColor: this.currentTargetColor,
      baseColor: baseColorToRGB,
      overlayColor: overlayColorToRGB,
      opacity: opacityNormalized,
      finalColor: blendedColor,
      score: score,
      distance: distance
    }

    this.results.push(result);
    if (!this.isGameFinished()){
      this.nextRound();
    }

  }

  // Reset the game
  reset() {
    this.currentRound = 0;
    this.results = [];
    this.totalScore = 0;
  }

  // Check if the game is finished
  isGameFinished(): boolean {
    return this.currentRound > this.totalRounds;
  }
}
