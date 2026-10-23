import { useContext } from "react";

import SentimentContext from "../contexts/SentimentContext";

export function useSentimentContext() {
  const context = useContext(SentimentContext);

  if (context === null) {
    throw new Error("useSentimentContext must be used within SentimentContext.Provider");
  }

  return context;
}
