export type Step = 1 | 2 | 3;

export interface ScrapeResponse {
  text: string;
  title: string;
}

export interface GenerateResponse {
  cover_letter: string;
}
