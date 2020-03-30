export interface Series {
  value: number;
  name: string;
}

export interface DataLineChart {
  name: string;
  series: Series[];
}
