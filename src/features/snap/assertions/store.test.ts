import { mock } from 'ts-mockito';

import { fetchSnapAssertionsForSnapId } from './api';
import {
  snapAssertionsSlice,
  getSnapAssertions,
  getSnapAssertionDetailsForSnapId,
} from './store';
import { type SnapAssertion, type SnapCredentialSubject } from './types';
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
      const initialState = {
        snapAssertions: [
          {
            snapId: 'snap://snapId',
            endorsementsCount: 0,
            reportsCount: 0,
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
        endorsementsCount: 1,
        reportsCount: 1,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapAssertions.snapAssertions = [snapAssertion];

      const snapAssertionDetails = getSnapAssertionDetailsForSnapId('snapId')(
        mockedApplicationState,
      );

      expect(snapAssertionDetails).toStrictEqual(snapAssertion);
    });
  });
});
