import { t } from '@lingui/macro';

import { SentimentType } from './types';
import { getColorForSentiment } from './utils';

describe('getColorForSentiment', () => {
  it.each([
    [SentimentType.InsufficientReview, t`warning`],
    [SentimentType.Secured, t`success`],
    [SentimentType.InReview, t`warning`],
    [SentimentType.Unsecured, t`error`],
    [SentimentType.UserFriendly, t`success`],
  ])(
    'should return the correct color for sentiment type %s',
    (type, expectedColor) => {
      const result = getColorForSentiment(type);
      expect(result).toBe(expectedColor);
    },
  );
});
