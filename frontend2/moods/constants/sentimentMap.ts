import {
  HORRIBLE,
  VERY_BAD,
  BAD,
  KINDA_BAD,
  FINE,
  KINDA_GOOD,
  GOOD,
  VERY_GOOD,
  AMAZING,
  type SentimentType,
} from "./entryOptions";

export const sentimentMap: { [key: number]: SentimentType } = {
  1: HORRIBLE,
  2: VERY_BAD,
  3: BAD,
  4: KINDA_BAD,
  5: FINE,
  6: KINDA_GOOD,
  7: GOOD,
  8: VERY_GOOD,
  9: AMAZING,
};

export const getSentimentFromValue = (value: SentimentType): SentimentScore => {
  for (const key in sentimentMap) {
    if (sentimentMap[key] === value) {
      return parseInt(key) as SentimentScore;
    }
  }

  throw new Error(`Sentiment value "${value}" not found in sentimentMap.`);
};

export const sentimentClasses = {
  1: {
    border: "sentiment-horrible-border",
    text: "sentiment-horrible-text",
  },
  2: {
    border: "sentiment-very-bad-border",
    text: "sentiment-very-bad-text",
  },
  3: {
    border: "sentiment-bad-border",
    text: "sentiment-bad-text",
  },
  4: {
    border: "sentiment-kinda-bad-border",
    text: "sentiment-kinda-bad-text",
  },
  5: {
    border: "sentiment-fine-border",
    text: "sentiment-fine-text",
  },
  6: {
    border: "sentiment-kinda-good-border",
    text: "sentiment-kinda-good-text",
  },
  7: {
    border: "sentiment-good-border",
    text: "sentiment-good-text",
  },
  8: {
    border: "sentiment-very-good-border",
    text: "sentiment-very-good-text",
  },
  9: {
    border: "sentiment-amazing-border",
    text: "sentiment-amazing-text",
  },
};

export type SentimentScore = keyof typeof sentimentClasses;
export const sentimentScoreValues: SentimentScore[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const sentimentColorVariables = {
  1: "var(--sentiment-horrible)",
  2: "var(--sentiment-very-bad)",
  3: "var(--sentiment-bad)",
  4: "var(--sentiment-kinda-bad)",
  5: "var(--sentiment-fine)",
  6: "var(--sentiment-kinda-good)",
  7: "var(--sentiment-good)",
  8: "var(--sentiment-very-good)",
  9: "var(--sentiment-amazing)",
};
