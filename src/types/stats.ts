export interface QuartileInterval {
  lowerBound: number;
  upperBound: number;
}

export interface Quartile {
  totalItems: number;
  percentage: number;
  interval: QuartileInterval;
}