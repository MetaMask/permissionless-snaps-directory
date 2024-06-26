import { mock } from 'ts-mockito';

import { fetchTrustScoreForSnapId } from './api';
import {
  getSnapTrustScoreForSnapId,
  getSnapTrustScores,
  snapTrustScoresSlice,
} from './store';
import { type ApplicationState } from '../../../store';

describe('snapTrustScoresSlice', () => {
  describe('extraReducers', () => {
    it('fetchTrustScoreForSnapId.fulfilled', () => {
      const mockPayload = {
        subjectId: `snapId`,
        value: -1,
        trustScoreScope: '',
        result: 5,
      };
      const initialState = {
        snapTrustScores: [{ snapId: `snapId`, result: 2 }],
      };
      const action = fetchTrustScoreForSnapId.fulfilled(
        mockPayload,
        '',
        'meta',
      );

      const newState = snapTrustScoresSlice.reducer(initialState, action);

      expect(newState.snapTrustScores).toHaveLength(1);
    });
  });
});

describe('Selectors', () => {
  describe('getSnapTrustScores', () => {
    it('should return snapTrustScores from the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapTrustScores.snapTrustScores = [];

      const snapTrustScores = getSnapTrustScores(mockedApplicationState);

      expect(snapTrustScores).toStrictEqual([]);
    });
  });

  describe('getSnapTrustScoreForSnapId', () => {
    it('should return snapTrustScore for a specific snapId', () => {
      const snapTrustScore = {
        snapId: 'snapId',
        result: 5,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapTrustScores.snapTrustScores = [snapTrustScore];

      const snapTrustScoreDetails = getSnapTrustScoreForSnapId('snapId')(
        mockedApplicationState,
      );

      expect(snapTrustScoreDetails).toStrictEqual(snapTrustScore);
    });

    it('should return snapTrustScore with result -1 for snapId not available in the state', () => {
      const snapTrustScore = {
        snapId: 'snapId',
        result: -1,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapTrustScores.snapTrustScores = [];

      const snapTrustScoreDetails = getSnapTrustScoreForSnapId('snapId')(
        mockedApplicationState,
      );

      expect(snapTrustScoreDetails).toStrictEqual(snapTrustScore);
    });
  });
});
