import { RoundResult } from "./round-result";

export interface SummaryInfo {
    results: RoundResult[],
    totalScore: Number,
    totalRounds: Number,
    metrics: {
        avgOverlayIntensity: Number,
        avgBaseIntensity: Number
    }
}
