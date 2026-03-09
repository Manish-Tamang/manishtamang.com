export interface WakaTimeSummary {
  totalSeconds: number;
  totalTimeText: string;
  dailyAverageSeconds: number;
  dailyAverageText: string;
  bestDayDate: string | null;
  bestDaySeconds: number;
  bestDayText: string;
}

export interface WakaTimeApiResponse {
  summary: WakaTimeSummary;
  updatedAt: string;
}
