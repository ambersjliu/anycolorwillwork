import { RGB } from "./rgb";

export interface RoundResult {
    contextColor: RGB;
    targetColor: RGB;
    baseColor: RGB;
    overlayColor: RGB;
    opacity: number; // 0-1
    finalColor: RGB;
    score: number; // 1 if success, 0 if failure
    distance: number;
  }
  