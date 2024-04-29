import { mock } from 'ts-mockito';

import {
  fetchAccountAssertionsForAccountId,
  fetchAssertionsByIssuer,
  fetchAssertionsForAllAccounts,
} from './api';
import { SubjectType, Value } from './enums';
import {
  accountAssertionsSlice,
  type AccountAssertionsState,
  type AccountAssertionState,
  getAccountAssertionDetailsForAccountId,
  getAccountAssertions,
  getCurrentTrustworthinessLevelForIssuer,
  getIssuedAssertions,
  getIssuedAssertionsForIssuerId,
  getTechnicalEndorsementsForAccountId,
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
      mockAssertionResponse.issuerId = 'issuerId';
      mockAssertionResponse.subjectId = 'subjectId';

      const mockPayload = {
        accountId: 'subjectId',
        assertions: [mockAssertionResponse],
      };

      const initialState: AccountAssertionsState = {
        accountAssertions: [
          {
            subjectId: 'subjectId',
            subjectType: SubjectType.User,
            issuerId: 'issuerId',
            trustworthiness: [],
            creationAt: new Date(),
            value: Value.Endorsement,
            reasons: [''],
            statusReason: { type: 'test', value: ['test'] },
            issuanceDate: new Date(),
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
      mockAssertionResponse.issuerId = 'issuerId';
      mockAssertionResponse.subjectId = 'subjectId';
      const mockPayload = [mockAssertionResponse];

      const initialState: AccountAssertionsState = {
        accountAssertions: [
          {
            subjectId: 'subjectId',
            issuerId: 'issuerId',
            trustworthiness: [],
            creationAt: new Date(),
            value: Value.Endorsement,
            statusReason: { type: 'test', value: ['test'] },
            issuanceDate: new Date(),
            subjectType: SubjectType.User,
            reasons: [''],
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
      mockAssertionResponse1.issuerId = 'issuerId';
      mockAssertionResponse1.subjectId = 'subjectId';
      mockAssertionResponse1.assertion.issuanceDate = new Date(
        '2023-01-01T00:00:00Z',
      );
      const mockAssertionResponse2: AccountAssertion = mock<AccountAssertion>();
      mockAssertionResponse2.id = 'id';
      mockAssertionResponse2.assertion = mock<AccountAssertionResponse>();
      mockAssertionResponse2.issuerId = 'issuerId';
      mockAssertionResponse2.subjectId = 'subjectId';
      mockAssertionResponse2.assertion.issuanceDate = new Date(
        '2024-01-01T00:00:00Z',
      );

      const mockPayload = {
        accountId: 'subjectId',
        assertions: [mockAssertionResponse1, mockAssertionResponse2],
      };

      const initialState: AccountAssertionsState = {
        accountAssertions: [],
        issuedAssertions: [],
      };
      const action = fetchAssertionsByIssuer.fulfilled(
        mockPayload,
        '',
        'issuerId',
      );

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
      const assertion1: AccountAssertionState = {
        subjectId: 'subjectId',
        subjectType: SubjectType.User,
        issuerId: 'issuerId',
        trustworthiness: [],
        creationAt: new Date(),
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        value: Value.Endorsement,
        reasons: [''],
      };
      const assertion2: AccountAssertionState = {
        subjectId: 'subjectId',
        subjectType: SubjectType.User,
        issuerId: 'notIssuerId',
        trustworthiness: [],
        creationAt: new Date(),
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        value: Value.Endorsement,
        reasons: [''],
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
    it('should return account assertion details for a specific subjectId when there are no account assertions in the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'subjectId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'subjectId',
        endorsementsCount: 0,
        reportsCount: 0,
      });
    });

    it('should return account assertion details for a specific subjectId with no endorsements or reports', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [''],
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'subjectId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'subjectId',
        endorsementsCount: 0,
        reportsCount: 0,
      });
    });

    it('should return account assertion details for a specific subjectId with endorsements but no reports', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment }, // Positive endorsement
        ],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'subjectId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'subjectId',
        endorsementsCount: 1,
        reportsCount: 0,
      });
    });

    it('should return account assertion details for a specific subjectId with reports but no endorsements', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: -1, scope: TrustworthinessScope.Honesty }, // Negative report
        ],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.Honesty.toString()],
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'subjectId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'subjectId',
        endorsementsCount: 0,
        reportsCount: 1,
      });
    });

    it('should return account assertion details for a specific subjectId with both endorsements and reports', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment }, // Positive endorsement
          { level: -1, scope: TrustworthinessScope.Honesty }, // Negative report
        ],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [
          TrustworthinessScope.SoftwareDevelopment.toString(),
          TrustworthinessScope.Honesty.toString(),
        ],
      };

      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const accountAssertionDetails = getAccountAssertionDetailsForAccountId(
        'subjectId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual({
        accountId: 'subjectId',
        endorsementsCount: 1,
        reportsCount: 1,
      });
    });
  });

  describe('getTechnicalEndorsementsForAccountId', () => {
    it('should return technical endorsements for a specific subjectId', () => {
      const earlierDate = new Date('2022-01-01');
      const middleDate = new Date('2022-01-02');
      const laterDate = new Date('2022-01-03');
      const accountAssertion1: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId1',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: earlierDate, // Earlier date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };
      const accountAssertion2: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId2',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: middleDate, // Middle date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };
      const accountAssertion3: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId3',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.UserExperienceDesign },
        ],
        creationAt: laterDate, // Later date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.UserExperienceDesign.toString()],
      };
      const accountAssertion4: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId4',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareSecurity },
        ],
        creationAt: laterDate, // Later date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareSecurity.toString()],
      };
      const accountAssertion5: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId5',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: laterDate, // Later date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.Honesty.toString()],
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion1,
        accountAssertion2,
        accountAssertion3,
        accountAssertion4,
        accountAssertion5,
      ];

      const accountAssertionDetails = getTechnicalEndorsementsForAccountId(
        'subjectId',
      )(mockedApplicationState);

      expect(accountAssertionDetails).toStrictEqual([
        {
          type: TrustworthinessScope.SoftwareDevelopment,
          endorsements: [accountAssertion1, accountAssertion2],
        },
        {
          type: TrustworthinessScope.SoftwareSecurity,
          endorsements: [accountAssertion4],
        },
      ]);
    });
  });

  describe('getCurrentTrustworthinessLevelForIssuer', () => {
    it('should return null if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];
      const result = getCurrentTrustworthinessLevelForIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBeUndefined();
    });

    it('should return the latest trustworthiness level for an issuer', () => {
      const earlierDate = new Date('2022-01-01');
      const middleDate = new Date('2022-01-02');
      const laterDate = new Date('2022-01-03');
      const accountAssertion1: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: earlierDate, // Earlier date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };
      const accountAssertion2: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: middleDate, // Middle date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };
      const accountAssertion3: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: laterDate, // Later date
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.Honesty.toString()],
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion1,
        accountAssertion3,
        accountAssertion2,
      ];

      const result = getCurrentTrustworthinessLevelForIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(-1); // Ensure the latest level is returned
    });
  });

  describe('isAccountEndorsedByIssuer', () => {
    it('should return false if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];
      const result = isAccountEndorsedByIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });

    it('should return true if account is endorsed by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountEndorsedByIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(true);
    });

    it('should return false if account is not endorsed by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.Honesty.toString()],
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountEndorsedByIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });
  });

  describe('isAccountReportedByIssuer', () => {
    it('should return false if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [];
      const result = isAccountReportedByIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });

    it('should return true if account is reported by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [{ level: -1, scope: TrustworthinessScope.Honesty }],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.Honesty.toString()],
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountReportedByIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(true);
    });

    it('should return false if account is not reported by the issuer', () => {
      const accountAssertion: AccountAssertionState = {
        subjectId: 'subjectId',
        issuerId: 'issuerId',
        trustworthiness: [
          { level: 1, scope: TrustworthinessScope.SoftwareDevelopment },
        ],
        creationAt: new Date(),
        value: Value.Endorsement,
        statusReason: { type: 'test', value: ['test'] },
        issuanceDate: new Date(),
        subjectType: SubjectType.User,
        reasons: [TrustworthinessScope.SoftwareDevelopment.toString()],
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.accountAssertions.accountAssertions = [
        accountAssertion,
      ];

      const result = isAccountReportedByIssuer(
        'subjectId',
        'issuerId',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });
  });
});
