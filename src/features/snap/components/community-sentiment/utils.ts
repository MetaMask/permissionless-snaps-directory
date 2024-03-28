import { t } from '@lingui/macro';

import { SentimentType } from './types';

export const getColorForSentiment = (type: SentimentType) => {
  switch (type) {
    case SentimentType.InsufficientReview:
      return t`warning`;
    case SentimentType.Endorsed:
      return t`success`;
    case SentimentType.InReview:
      return t`warning`;
    case SentimentType.Reported:
      return t`error`;
    default:
      return t`success`;
  }
};

export const getSentimentTypeFromResult = (result: number) => {
  switch (result) {
    case 1:
      return SentimentType.Endorsed;
    case 2:
      return SentimentType.InReview;
    case 3:
      return SentimentType.Reported;
    default:
      return SentimentType.InsufficientReview;
  }
};
