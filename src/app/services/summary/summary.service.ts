import { Injectable } from '@angular/core';
import { RoundResult } from '../../interfaces/round-result';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private roundResults: RoundResult[] = [];
  private totalScore = 0;
  private totalRounds = 0;

  // Store game results
  setResults(results: RoundResult[], score: number, totalRounds: number) {
    this.roundResults = results;
    this.totalScore = score;
    this.totalRounds = totalRounds;
  }

  // Get summary data
  getSummaryData() {
    return {
      results: this.roundResults,
      totalScore: this.totalScore,
      totalRounds: this.totalRounds,
      metrics: this.computeMetrics()
    };
  }

  /**
   * Compute metrics of selected colours.
   * Formula: https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color 
   * @returns 
   */
  private computeMetrics() {
    if (this.roundResults.length === 0) {
      return { avgDarkness: 0, avgOverlayIntensity: 0, avgBaseIntensity: 0 };
    }

    const avg = (values: number[]) =>
      values.reduce((sum, val) => sum + val, 0) / values.length;

    const overlayIntensity = this.roundResults.map(
      (result) => (2 * result.overlayColor.r + result.overlayColor.g + 3 * result.overlayColor.b) / 7
    );
    const baseIntensity = this.roundResults.map(
      (result) => (2 * result.baseColor.r + result.baseColor.g + 3 * result.baseColor.b) / 6
    );

    return {
      avgOverlayIntensity: avg(overlayIntensity),
      avgBaseIntensity: avg(baseIntensity)
    };
  }
}
