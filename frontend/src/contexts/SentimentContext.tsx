import { createContext } from "react";
import type { SentimentScore } from "../constants/sentimentMap";

type SentimentContextType = {
  sentiment: SentimentScore | null;
};

const SentimentContext = createContext<SentimentContextType | null>(null);

export default SentimentContext;
