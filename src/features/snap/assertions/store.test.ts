import { mock } from 'ts-mockito';

import { fetchSnapAssertionsForSnapId } from './api';
import {
  getCurrentSnapStatusForIssuer,
  getIssuedAssertionsForSnapId,
  getSnapAssertionDetailsForSnapId,
  getSnapAssertions,
  isSnapEndorsedByIssuer,
  isSnapReportedByIssuer,
  snapAssertionsSlice,
  type SnapAssertionsState,
  type SnapAssertionState,
  SnapStatusReasonType,
} from './store';
import {
  type SnapAssertion,
  type SnapCredentialSubject,
  SnapCurrentStatus,
} from './types';
import { type ApplicationState } from '../../../store';

describe('snapAssertionsSlice', () => {
  describe('extraReducers', () => {
    it('fetchSnapAssertionsForSnapId.fulfilled', () => {
      const mockSnapAssertion: SnapAssertion = mock<SnapAssertion>();
      mockSnapAssertion.assertion.credentialSubject =
        mock<SnapCredentialSubject>();
      mockSnapAssertion.assertion.credentialSubject.id = 'snapId';
      const mockPayload = {
        snapId: 'snapId',
        assertions: [mockSnapAssertion],
      };
      const initialState: SnapAssertionsState = {
        snapAssertions: [
          {
            snapId: 'snapId',
            issuer: 'issuer',
            statusReason: {
              type: SnapStatusReasonType.Endorse,
              value: ['Reason'],
            },
            currentStatus: SnapCurrentStatus.Endorsed,
            creationAt: new Date(),
            issuanceDate: new Date(),
          },
        ],
      };
      const action = fetchSnapAssertionsForSnapId.fulfilled(
        mockPayload,
        '',
        'meta',
      );

      const newState = snapAssertionsSlice.reducer(initialState, action);

      expect(newState.snapAssertions).toHaveLength(1);
    });
  });
});

describe('Selectors', () => {
  describe('getSnapAssertions', () => {
    it('should return snapAssertions from the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [];

      const snapAssertions = getSnapAssertions(mockedApplicationState);

      expect(snapAssertions).toStrictEqual([]);
    });
  });

  describe('getSnapAssertionDetailsForSnapId', () => {
    it('should return snap assertion details for a specific snapId', () => {
      const snapAssertion = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: new Date(),
        issuanceDate: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const snapAssertionDetails = getSnapAssertionDetailsForSnapId('snapId')(
        mockedApplicationState,
      );

      expect(snapAssertionDetails).toStrictEqual({
        snapId: 'snapId',
        endorsementsCount: 1,
        reportsCount: 0,
      });
    });
  });

  describe('getIssuedAssertionsForSnapId', () => {
    it('should return blank array if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [];
      const result = getIssuedAssertionsForSnapId('snapId')(
        mockedApplicationState,
      );
      expect(result).toStrictEqual([]);
    });

    it('should return the assertions for a Snap', () => {
      const earlierDate = new Date('2022-01-01');
      const middleDate = new Date('2022-01-02');
      const laterDate = new Date('2022-01-03');
      const snapAssertion1: SnapAssertionState = {
        snapId: 'snapId1',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: earlierDate, // Earlier date
        issuanceDate: earlierDate,
      };
      const snapAssertion2: SnapAssertionState = {
        snapId: 'snapId1',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Malicious,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: laterDate, // Later date
        issuanceDate: laterDate,
      };
      const snapAssertion3: SnapAssertionState = {
        snapId: 'snapId2',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: middleDate, // Middle date
        issuanceDate: middleDate,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [
        snapAssertion1,
        snapAssertion2,
        snapAssertion3,
      ];

      const result = getIssuedAssertionsForSnapId('snapId1')(
        mockedApplicationState,
      );
      expect(result).toStrictEqual([snapAssertion2, snapAssertion1]);
    });
  });

  describe('getCurrentSnapStatusForIssuer', () => {
    it('should return null if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [];
      const result = getCurrentSnapStatusForIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBeNull();
    });

    it('should return the latest snap status for an issuer', () => {
      const earlierDate = new Date('2022-01-01');
      const middleDate = new Date('2022-01-02');
      const laterDate = new Date('2022-01-03');
      const snapAssertion1: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: earlierDate, // Earlier date
        issuanceDate: earlierDate,
      };
      const snapAssertion2: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Malicious,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: laterDate, // Later date
        issuanceDate: laterDate,
      };
      const snapAssertion3: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: middleDate, // Middle date
        issuanceDate: middleDate,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [
        snapAssertion1,
        snapAssertion2,
        snapAssertion3,
      ];

      const result = getCurrentSnapStatusForIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(SnapCurrentStatus.Disputed); // Ensure the latest status is returned
    });
  });

  describe('isSnapEndorsedByIssuer', () => {
    it('should return false if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [];
      const result = isSnapEndorsedByIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });

    it('should return true if snap is endorsed by the issuer', () => {
      const snapAssertion: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: new Date(),
        issuanceDate: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const result = isSnapEndorsedByIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(true);
    });

    it('should return false if snap is not endorsed by the issuer', () => {
      const snapAssertion: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Malicious,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: new Date(),
        issuanceDate: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const result = isSnapEndorsedByIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });
  });

  describe('isSnapReportedByIssuer', () => {
    it('should return false if no assertions found', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [];
      const result = isSnapReportedByIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });

    it('should return true if snap is reported by the issuer', () => {
      const snapAssertion: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Malicious,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: new Date(),
        issuanceDate: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const result = isSnapReportedByIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(true);
    });

    it('should return false if snap is not reported by the issuer', () => {
      const snapAssertion: SnapAssertionState = {
        snapId: 'snapId',
        issuer: 'issuer',
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: ['Reason'],
        },
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: new Date(),
        issuanceDate: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const result = isSnapReportedByIssuer(
        'snapId',
        'issuer',
      )(mockedApplicationState);
      expect(result).toBe(false);
    });
  });
});
