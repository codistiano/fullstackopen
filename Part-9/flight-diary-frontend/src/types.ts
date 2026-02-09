export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
export type Visibility = "great" | "good" | "ok" | "poor";

export interface diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<diary, "id">;
