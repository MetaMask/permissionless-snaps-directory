import { mock } from 'ts-mockito';

import { fetchTrustScoreForSnapId } from './api';
import {
  snapTrustScoresSlice,
  getSnapTrustScores,
  getSnapTrustScoreForSnapId,
} from './store';
import { type ApplicationState } from '../../../store';

describe('snapTrustScoresSlice', () => {
  describe('extraReducers', () => {
    it('fetchTrustScoreForSnapId.fulfilled', () => {
      const mockPayload = {
        subjectId: `snap://snapId`,
        value: -1,
        trustScoreScope: '',
        result: 5,
      };
      const initialState = {
        snapTrustScores: [{ snapId: `snap://snapId`, result: 2 }],
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
        snapId: 'snap://snapId',
        result: 5,
      };
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.snapTrustScores.snapTrustScores = [snapTrustScore];

      const snapTrustScoreDetails = getSnapTrustScoreForSnapId('snapId')(
        mockedApplicationState,
      );

      expect(snapTrustScoreDetails).toStrictEqual(snapTrustScore);
    });
  });
});
