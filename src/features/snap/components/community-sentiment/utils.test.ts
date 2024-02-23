import { SentimentType } from './types';
import { getColorForSentiment, getSentimentTypeFromResult } from './utils';

describe('getColorForSentiment', () => {
  it.each`
    type                                | expectedColor
    ${SentimentType.InsufficientReview} | ${'warning'}
    ${SentimentType.Endorsed}           | ${'success'}
    ${SentimentType.InReview}           | ${'warning'}
    ${SentimentType.Reported}           | ${'error'}
    ${123}                              | ${'success'}
  `('returns $expectedColor color for $type', ({ type, expectedColor }) => {
    expect(getColorForSentiment(type)).toBe(expectedColor);
  });
});

describe('getSentimentTypeFromResult', () => {
  it.each`
    result | expectedType
    ${0}   | ${SentimentType.InsufficientReview}
    ${1}   | ${SentimentType.Endorsed}
    ${2}   | ${SentimentType.InReview}
    ${3}   | ${SentimentType.Reported}
    ${4}   | ${SentimentType.Unknown}
    ${-1}  | ${SentimentType.Unknown}
  `('returns $expectedType for result $result', ({ result, expectedType }) => {
    expect(getSentimentTypeFromResult(result)).toBe(expectedType);
  });
});
