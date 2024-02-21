import { mock } from 'ts-mockito';

import {
  fetchTrustScoreForAccountId,
  fetchTrustScoreForAllAccounts,
} from './api';
import {
  accountTrustScoresSlice,
  type AccountTrustScoreState,
  getAccountsTrustScores,
  getAccountTrustScoreForAccountId,
  getTopAccountsForScope,
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

    it('fetchTrustScoreForAllAccounts.fulfilled', () => {
      const mockPayload = [
        {
          subjectId: 'accountId1',
          result: 1,
          accuracy: 0.85,
          rank: 1,
          value: 1,
          trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        },
        {
          subjectId: 'accountId2',
          result: 2,
          accuracy: 0.75,
          rank: 2,
          value: 1,
          trustScoreScope: TrustScoreScope.SoftwareSecurity,
        },
      ];
      const initialState = {
        accountTrustScores: [
          {
            accountId: 'accountId1',
            result: 0.5,
            accuracy: 0.75,
            rank: 1,
            trustScoreScope: TrustScoreScope.SoftwareSecurity,
          },
        ],
      };
      const action = fetchTrustScoreForAllAccounts.fulfilled(mockPayload, '');

      const newState = accountTrustScoresSlice.reducer(initialState, action);

      expect(newState.accountTrustScores).toHaveLength(2);
      expect(newState.accountTrustScores).toStrictEqual([
        {
          accountId: 'accountId1',
          result: 1,
          accuracy: 0.85,
          rank: 1,
          trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        },
        {
          accountId: 'accountId2',
          result: 2,
          accuracy: 0.75,
          rank: 2,
          trustScoreScope: TrustScoreScope.SoftwareSecurity,
        },
      ]);
    });

    it('fetchTrustScoreForAllAccounts.fulfilled with empty payload', () => {
      const initialState = {
        accountTrustScores: [
          {
            accountId: 'accountId1',
            result: 0.5,
            accuracy: 0.75,
            rank: 1,
            trustScoreScope: TrustScoreScope.SoftwareSecurity,
          },
        ],
      };
      const action = fetchTrustScoreForAllAccounts.fulfilled([], '');

      const newState = accountTrustScoresSlice.reducer(initialState, action);

      expect(newState.accountTrustScores).toHaveLength(1);
      expect(newState.accountTrustScores).toStrictEqual(
        initialState.accountTrustScores,
      );
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

  describe('getTopAccountsForScope', () => {
    const mockAccountsTrustScore: AccountTrustScoreState[] = [
      {
        accountId: 'account1',
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        result: 0.8,
        accuracy: 0.85,
        rank: 1,
      },
      {
        accountId: 'account2',
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        result: 0.8,
        accuracy: 0.85,
        rank: 3,
      },
      {
        accountId: 'account4',
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        result: 0.8,
        accuracy: 0.85,
      },
      {
        accountId: 'account3',
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        result: 0.8,
        accuracy: 0.85,
        rank: 2,
      },
      {
        accountId: 'account5',
        trustScoreScope: TrustScoreScope.SoftwareSecurity,
        result: 0.8,
        accuracy: 0.85,
        rank: 4,
      },
    ];

    it('returns the top accounts for the specified trust score scope', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountTrustScores.accountTrustScores =
        mockAccountsTrustScore;

      const topSoftwareDevelopers = getTopAccountsForScope(
        3,
        TrustScoreScope.SoftwareDevelopment,
      )(mockedApplicationState);

      // Expect the selector to return the top accounts for SoftwareDevelopment scope
      expect(topSoftwareDevelopers).toHaveLength(3);
      expect(topSoftwareDevelopers[0].accountId).toBe('account1');
      expect(topSoftwareDevelopers[1].accountId).toBe('account3');
      expect(topSoftwareDevelopers[2].accountId).toBe('account2');
    });

    it('returns empty array if there are no accounts for the specified scope', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountTrustScores.accountTrustScores = [];

      const topAccounts = getTopAccountsForScope(
        2,
        TrustScoreScope.SoftwareDevelopment,
      )(mockedApplicationState);

      // Expect the selector to return an empty array
      expect(topAccounts).toStrictEqual([]);
    });

    it('returns empty array if topCounter is 0', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountTrustScores.accountTrustScores =
        mockAccountsTrustScore;

      const topSoftwareDevelopers = getTopAccountsForScope(
        0,
        TrustScoreScope.SoftwareDevelopment,
      )(mockedApplicationState);

      // Expect the selector to return an empty array
      expect(topSoftwareDevelopers).toStrictEqual([]);
    });
  });
});
