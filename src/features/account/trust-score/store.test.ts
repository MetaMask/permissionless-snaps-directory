import { mock } from 'ts-mockito';

import { fetchTrustScoreForAccountId } from './api';
import {
  accountTrustScoresSlice,
  getAccountsTrustScores,
  getAccountTrustScoreForAccountId,
} from './store';
import { TrustScoreScope } from './types';
import { type ApplicationState } from '../../../store';

describe('accountTrustScoresSlice', () => {
  describe('extraReducers', () => {
    it('fetchTrustScoreForAccountId.fulfilled', () => {
      const mockPayload = [
        {
          subjectId: 'accountId',
          result: 0.8,
          accuracy: 0.85,
          rank: 1,
          value: 1,
          trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        },
      ];
      const initialState = {
        accountTrustScores: [
          {
            accountId: 'accountId',
            result: 0.5,
            accuracy: 0.75,
            rank: 1,
            trustScoreScope: TrustScoreScope.SoftwareSecurity,
          },
        ],
      };
      const action = fetchTrustScoreForAccountId.fulfilled(
        mockPayload,
        '',
        'accountId',
      );

      const newState = accountTrustScoresSlice.reducer(initialState, action);

      expect(newState.accountTrustScores).toHaveLength(1);
      expect(newState.accountTrustScores[0]).toStrictEqual({
        accountId: 'accountId',
        result: 0.8,
        accuracy: 0.85,
        rank: 1,
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
      });
    });

    it('fetchTrustScoreForAccountId.fulfilled with empty payload', () => {
      const initialState = {
        accountTrustScores: [
          {
            accountId: 'accountId',
            result: 0.5,
            accuracy: 0.75,
            trustScoreScope: TrustScoreScope.SoftwareSecurity,
          },
        ],
      };
      const action = fetchTrustScoreForAccountId.fulfilled([], '', 'accountId');

      const newState = accountTrustScoresSlice.reducer(initialState, action);

      expect(newState.accountTrustScores).toHaveLength(1);
      expect(newState.accountTrustScores[0]).toStrictEqual({
        accountId: 'accountId',
        result: 0.5,
        accuracy: 0.75,
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
      });
    });
  });
});

describe('Selectors', () => {
  describe('getAccountsTrustScores', () => {
    it('should return accountTrustScores from the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountTrustScores.accountTrustScores = [];

      const accountTrustScores = getAccountsTrustScores(mockedApplicationState);

      expect(accountTrustScores).toStrictEqual([]);
    });
  });

  describe('getAccountTrustScoreForAccountId', () => {
    it('should return accountTrustScore for a specific accountId', () => {
      const accountTrustScore = {
        accountId: 'accountId',
        result: 0.8,
        accuracy: 0.85,
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountTrustScores.accountTrustScores = [
        accountTrustScore,
      ];

      const accountTrustScoreDetails = getAccountTrustScoreForAccountId(
        'accountId',
      )(mockedApplicationState);

      expect(accountTrustScoreDetails).toStrictEqual([accountTrustScore]);
    });
  });
});
