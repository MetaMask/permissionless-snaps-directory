import { mock } from 'ts-mockito';

import {
  fetchAccountAssertionsForAccountId,
  fetchAssertionsForAllAccounts,
} from './api';
import {
  accountAssertionsSlice,
  getAccountAssertions,
  getAccountAssertionDetailsForAccountId,
  type AccountAssertionsState,
  getCurrentTrustworthinessLevelForIssuer,
  isAccountEndorsedByIssuer,
  isAccountReportedByIssuer,
  type AccountAssertionState,
} from './store';
import {
  type AccountAssertion,
  type AccountAssertionResponse,
  TrustworthinessScope,
} from './types';
import { type ApplicationState } from '../../../store';

describe('accountAssertionsSlice', () => {
  describe('extraReducers', () => {
    it('fetchAccountAssertionsForAccountId.fulfilled', () => {
      const mockAssertionResponse: AccountAssertion = mock<AccountAssertion>();
      mockAssertionResponse.id = 'id';
      mockAssertionResponse.assertion = mock<AccountAssertionResponse>();
      mockAssertionResponse.assertion.issuer = 'did:pkh:issuer';
      mockAssertionResponse.assertion.credentialSubject.id =
        'did:pkh:accountId';
      const mockPayload = {
        accountId: 'did:pkh:accountId',
        assertions: [mockAssertionResponse],
      };
      const initialState: AccountAssertionsState = {
        accountAssertions: [
          {
            accountId: 'did:pkh:accountId',
            issuer: 'did:pkh:issuer',
            trustworthiness: [],
            creationAt: new Date(),
          },
        ],
      };
      const action = fetchAccountAssertionsForAccountId.fulfilled(
        mockPayload,
        '',
        'meta',
      );

      const newState = accountAssertionsSlice.reducer(initialState, action);

      expect(newState.accountAssertions).toHaveLength(1);
    });

    it('fetchAssertionsForAllAccounts.fulfilled', () => {
      const mockAssertionResponse: AccountAssertion = mock<AccountAssertion>();
      mockAssertionResponse.id = 'id';
      mockAssertionResponse.assertion = mock<AccountAssertionResponse>();
      mockAssertionResponse.assertion.issuer = 'did:pkh:issuer';
      mockAssertionResponse.assertion.credentialSubject.id =
        'did:pkh:accountId';
      const mockPayload = [mockAssertionResponse];

      const initialState: AccountAssertionsState = {
        accountAssertions: [
          {
            accountId: 'did:pkh:accountId',
            issuer: 'did:pkh:issuer',
            trustworthiness: [],
            creationAt: new Date(),
          },
        ],
      };
      const action = fetchAssertionsForAllAccounts.fulfilled(mockPayload, '');

      const newState = accountAssertionsSlice.reducer(initialState, action);

      expect(newState.accountAssertions).toHaveLength(1);
    });
  });
});

describe('Selectors', () => {
  describe('getAccountAssertions', () => {
    it('should return accountAssertions from the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];

      const accountAssertions = getAccountAssertions(mockedApplicationState);

      expect(accountAssertions).toStrictEqual([]);
    });
  });

  describe('getAccountAssertionDetailsForAccountId', () => {
    it('should return account assertion details for a specific accountId when there are no account assertions in the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'accountId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'accountId',
        endorsementsCount: 0,
        reportsCount: 0,
      });
    });

    it('should return account assertion details for a specific accountId with no endorsements or reports', () => {
      const accountAssertion = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [],
        creationAt: new Date(),
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'accountId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'accountId',
        endorsementsCount: 0,
        reportsCount: 0,
      });
    });

    it('should return account assertion details for a specific accountId with endorsements but no reports', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment }, // Positive endorsement
        ],
        creationAt: new Date(),
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'accountId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'accountId',
        endorsementsCount: 1,
        reportsCount: 0,
      });
    });

    it('should return account assertion details for a specific accountId with reports but no endorsements', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: -1, scope: TrustworthinessScope.Honesty }, // Negative report
        ],
        creationAt: new Date(),
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'accountId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'accountId',
        endorsementsCount: 0,
        reportsCount: 1,
      });
    });

    it('should return account assertion details for a specific accountId with both endorsements and reports', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment }, // Positive endorsement
          { level: -1, scope: TrustworthinessScope.Honesty }, // Negative report
        ],
        creationAt: new Date(),
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'accountId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'accountId',
        endorsementsCount: 1,
        reportsCount: 1,
      });
    });
  });

  describe('getCurrentTrustworthinessLevelForIssuer', () => {
    it('should return null if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];
      const result = getCurrentTrustworthinessLevelForIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBeUndefined();
    });

    it('should return the latest trustworthiness level for an issuer', () => {
      const earlierDate = new Date('2022-01-01');
      const middleDate = new Date('2022-01-02');
      const laterDate = new Date('2022-01-03');
      const accountAssertion1: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: earlierDate, // Earlier date
      };
      const accountAssertion2: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: middleDate, // Middle date
      };
      const accountAssertion3: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: laterDate, // Later date
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion1,
        accountAssertion3,
        accountAssertion2,
      ];

      const result = getCurrentTrustworthinessLevelForIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(-1); // Ensure the latest level is returned
    });
  });

  describe('isAccountEndorsedByIssuer', () => {
    it('should return false if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];
      const result = isAccountEndorsedByIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });

    it('should return true if account is endorsed by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountEndorsedByIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(true);
    });

    it('should return false if account is not endorsed by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountEndorsedByIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });
  });

  describe('isAccountReportedByIssuer', () => {
    it('should return false if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];
      const result = isAccountReportedByIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });

    it('should return true if account is reported by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountReportedByIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(true);
    });

    it('should return false if account is not reported by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        accountId: 'accountId',
        issuer: 'issuer',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountReportedByIssuer(
        'accountId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });
  });
});
