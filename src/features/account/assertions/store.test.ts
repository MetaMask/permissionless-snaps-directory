import { mock } from 'ts-mockito';

import {
  fetchAccountAssertionsForAccountId,
  fetchAssertionsByIssuer,
  fetchAssertionsForAllAccounts,
} from './api';
import {
  accountAssertionsSlice,
  type AccountAssertionsState,
  type AccountAssertionState,
  getAccountAssertionDetailsForAccountId,
  getAccountAssertions,
  getCurrentTrustworthinessLevelForIssuer,
  getIssuedAssertions,
  getIssuedAssertionsForIssuerId,
  isAccountEndorsedByIssuer,
  isAccountReportedByIssuer,
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
        issuedAssertions: [],
      };
      const action = fetchAccountAssertionsForAccountId.fulfilled(
        mockPayload,
        '',
        'meta',
      );

      const newState = accountAssertionsSlice.reducer(initialState, action);

      expect(newState.accountAssertions).toHaveLength(1);
      expect(newState.issuedAssertions).toHaveLength(0);
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
        issuedAssertions: [],
      };
      const action = fetchAssertionsForAllAccounts.fulfilled(mockPayload, '');

      const newState = accountAssertionsSlice.reducer(initialState, action);

      expect(newState.accountAssertions).toHaveLength(1);
      expect(newState.issuedAssertions).toHaveLength(0);
    });

    it('fetchAssertionsByIssuer.fulfilled', () => {
      const mockAssertionResponse1: AccountAssertion = mock<AccountAssertion>();
      mockAssertionResponse1.id = 'id';
      mockAssertionResponse1.assertion = mock<AccountAssertionResponse>();
      mockAssertionResponse1.assertion.issuer = 'did:pkh:issuer';
      mockAssertionResponse1.assertion.issuanceDate = new Date(
        '2023-01-01T00:00:00Z',
      );
      mockAssertionResponse1.assertion.credentialSubject.id =
        'did:pkh:accountId';
      const mockAssertionResponse2: AccountAssertion = mock<AccountAssertion>();
      mockAssertionResponse2.id = 'id';
      mockAssertionResponse2.assertion = mock<AccountAssertionResponse>();
      mockAssertionResponse2.assertion.issuer = 'did:pkh:issuer';
      mockAssertionResponse2.assertion.issuanceDate = new Date(
        '2024-01-01T00:00:00Z',
      );
      mockAssertionResponse2.assertion.credentialSubject.id =
        'did:pkh:accountId';

      const mockPayload = {
        assertions: [mockAssertionResponse1, mockAssertionResponse2],
      };

      const initialState: AccountAssertionsState = {
        accountAssertions: [],
        issuedAssertions: [],
      };
      const action = fetchAssertionsByIssuer.fulfilled(mockPayload, '');

      const newState = accountAssertionsSlice.reducer(initialState, action);

      expect(newState.accountAssertions).toHaveLength(0);
      expect(newState.issuedAssertions).toHaveLength(2);
      expect(newState?.issuedAssertions[0]?.issuanceDate).toStrictEqual(
        mockAssertionResponse2.assertion.issuanceDate,
      );
      expect(newState?.issuedAssertions[1]?.issuanceDate).toStrictEqual(
        mockAssertionResponse1.assertion.issuanceDate,
      );
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

  describe('getIssuedAssertions', () => {
    it('should return issuedAssertions from the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.issuedAssertions = {
        accountAssertions: [],
        issuedAssertions: [],
      };

      const issuedAssertions = getIssuedAssertions(mockedApplicationState);

      expect(issuedAssertions).toStrictEqual([]);
    });
  });

  describe('getIssuedAssertionsForIssuerId', () => {
    it('should return assertions issued by a specific issuerId', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      const assertion1 = {
        accountId: 'accountId',
        issuer: 'issuerId',
        trustworthiness: [],
        creationAt: new Date(),
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
      };
      const assertion2 = {
        accountId: 'accountId',
        issuer: 'notIssuerId',
        trustworthiness: [],
        creationAt: new Date(),
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
      };
      mockedApplicationState.issuedAssertions = {
        accountAssertions: [],
        issuedAssertions: [assertion1, assertion2],
      };

      const issuedAttestations = getIssuedAssertionsForIssuerId('issuerId')(
        mockedApplicationState,
      );

      expect(issuedAttestations).toStrictEqual([assertion1]);
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
