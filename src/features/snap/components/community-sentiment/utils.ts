import { t } from '@lingui/macro';

import { SentimentType } from './types';

export const getColorForSentiment = (type: SentimentType) => {
  switch (type) {
    case SentimentType.InsufficientReview:
      return t`warning`;
    case SentimentType.Secured:
      return t`success`;
    case SentimentType.InReview:
      return t`warning`;
    case SentimentType.Unsecured:
      return t`error`;
    default:
      return t`success`;
  }
};

export const getSentimentTypeFromResult = (result: number) => {
  switch (result) {
    case 0:
      return SentimentType.InsufficientReview;
    case 1:
      return SentimentType.Secured;
    case 2:
      return SentimentType.InReview;
    case 3:
      return SentimentType.Unsecured;
    default:
      return SentimentType.Unknown;
  }
};
