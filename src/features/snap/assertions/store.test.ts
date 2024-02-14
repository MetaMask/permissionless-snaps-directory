import { mock } from 'ts-mockito';

import { fetchSnapAssertionsForSnapId } from './api';
import {
  snapAssertionsSlice,
  getSnapAssertions,
  getSnapAssertionDetailsForSnapId,
  type SnapAssertionsState,
  type SnapAssertionState,
  getCurrentSnapStatusForIssuer,
  isSnapEndorsedByIssuer,
  isSnapReportedByIssuer,
} from './store';
import {
  SnapCurrentStatus,
  type SnapAssertion,
  type SnapCredentialSubject,
} from './types';
import { type ApplicationState } from '../../../store';

describe('snapAssertionsSlice', () => {
  describe('extraReducers', () => {
    it('fetchSnapAssertionsForSnapId.fulfilled', () => {
      const mockSnapAssertion: SnapAssertion = mock<SnapAssertion>();
      mockSnapAssertion.assertion.credentialSubject =
        mock<SnapCredentialSubject>();
      mockSnapAssertion.assertion.credentialSubject.id = 'snap://snapId';
      const mockPayload = {
        snapId: 'snapId',
        assertions: [mockSnapAssertion],
      };
      const initialState: SnapAssertionsState = {
        snapAssertions: [
          {
            snapId: 'snap://snapId',
            issuer: 'issuer',
            currentStatus: SnapCurrentStatus.Endorsed,
            creationAt: new Date(),
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
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: new Date(),
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const snapAssertionDetails = getSnapAssertionDetailsForSnapId('snapId')(
        mockedApplicationState,
      );

      expect(snapAssertionDetails).toStrictEqual({
        snapId: 'snap://snapId',
        endorsementsCount: 1,
        reportsCount: 0,
      });
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
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: earlierDate, // Earlier date
      };
      const snapAssertion2: SnapAssertionState = {
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: laterDate, // Later date
      };
      const snapAssertion3: SnapAssertionState = {
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: middleDate, // Middle date
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
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: new Date(),
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
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: new Date(),
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
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Disputed,
        creationAt: new Date(),
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
        snapId: 'snap://snapId',
        issuer: 'issuer',
        currentStatus: SnapCurrentStatus.Endorsed,
        creationAt: new Date(),
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
