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
