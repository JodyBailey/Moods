export const sentimentMap = {
  1: 'Horrible',
  2: 'Very Bad',
  3: 'Bad',
  4: 'Kinda Bad',
  5: 'Fine',
  6: 'Kinda Good',
  7: 'Good',
  8: 'Very Good',
  9: 'Amazing',
};

export const getSentimentFromValue = (value) => {
  for (let key in sentimentMap) {
    if (sentimentMap[key] === value) {
      return parseInt(key);
    }
  }
};

export const sentimentClasses = {
  1: {
    border: 'sentiment-horrible-border',
    text: 'sentiment-horrible-text',
  },
  2: {
    border: 'sentiment-very-bad-border',
    text: 'sentiment-very-bad-text',
  },
  3: {
    border: 'sentiment-bad-border',
    text: 'sentiment-bad-text',
  },
  4: {
    border: 'sentiment-kinda-bad-border',
    text: 'sentiment-kinda-bad-text',
  },
  5: {
    border: 'sentiment-fine-border',
    text: 'sentiment-fine-text',
  },
  6: {
    border: 'sentiment-kinda-good-border',
    text: 'sentiment-kinda-good-text',
  },
  7: {
    border: 'sentiment-good-border',
    text: 'sentiment-good-text',
  },
  8: {
    border: 'sentiment-very-good-border',
    text: 'sentiment-very-good-text',
  },
  9: {
    border: 'sentiment-amazing-border',
    text: 'sentiment-amazing-text',
  },
};


export const sentimentColorVariables = {
  1: 'var(--sentiment-horrible)',
  2: 'var(--sentiment-very-bad)',
  3: 'var(--sentiment-bad)',
  4: 'var(--sentiment-kinda-bad)',
  5: 'var(--sentiment-fine)',
  6: 'var(--sentiment-kinda-good)',
  7: 'var(--sentiment-good)',
  8: 'var(--sentiment-very-good)',
  9: 'var(--sentiment-amazing)',
}
