import { RoundResult } from "./round-result";

export interface GameResult {
    totalRounds: number;
    score: number;
    roundDetails: RoundResult[];
    averageDistance: number;
}
