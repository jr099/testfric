export interface ScoreInput {
  basePoints: number;
  comboMultiplier: number;
}

export function computeScore(input: ScoreInput): number {
  return Math.max(0, Math.round(input.basePoints * input.comboMultiplier));
}
