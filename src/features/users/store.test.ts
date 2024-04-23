import { mock } from 'ts-mockito';

import { fetchAllUsers } from './api';
import { getAllUsers, usersSlice } from './store';
import type { ApplicationState } from '../../store';

const mockPayload = [
  {
    id: 'accountId1',
    preferredName: 'User 1',
    website: 'https://user1.com',
    endorsementCount: 1,
    disputeCount: 0,
    createdAt: '2021-01-01',
    rank: 2,
  },
  {
    id: 'accountId2',
    preferredName: 'User 2',
    website: 'https://user2.com',
    endorsementCount: 2,
    disputeCount: 1,
    createdAt: '2021-01-02',
    rank: 1,
  },
  {
    id: 'accountId3',
    preferredName: 'User 3',
    website: 'https://user3.com',
    endorsementCount: 1,
    disputeCount: 0,
    createdAt: '2021-01-01',
    rank: null,
  },
  {
    id: 'accountId4',
    preferredName: 'User 4',
    website: 'https://user4.com',
    endorsementCount: 1,
    disputeCount: 0,
    createdAt: '2021-01-01',
    rank: 3,
  },
];

describe('fetchAllUsersSlice', () => {
  describe('extraReducers', () => {
    it('fetchAllUsers.fulfilled', () => {
      const initialState = {
        users: [],
      };
      const action = fetchAllUsers.fulfilled(mockPayload, '');

      const newState = usersSlice.reducer(initialState, action);

      expect(newState.users).toHaveLength(4);
      expect(newState.users).toStrictEqual(mockPayload);
    });

    it('fetchTrustScoreForAccountId.fulfilled with empty payload', () => {
      const initialState = {
        users: [],
      };
      const action = fetchAllUsers.fulfilled([], '');

      const newState = usersSlice.reducer(initialState, action);

      expect(newState.users).toHaveLength(0);
      expect(newState.users).toStrictEqual([]);
    });
  });
});

describe('Selectors', () => {
  describe('getAllUsers', () => {
    it('should return all users sorted by rank from the store', () => {
      const mockedApplicationState: ApplicationState = mock<ApplicationState>();
      mockedApplicationState.users.users = mockPayload;

      const accountTrustScores = getAllUsers()(mockedApplicationState);

      expect(accountTrustScores).toStrictEqual([
        mockPayload[1],
        mockPayload[0],
        mockPayload[3],
        mockPayload[2],
      ]);
    });
  });
});
