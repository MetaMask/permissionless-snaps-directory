import { mock } from 'ts-mockito';

import { fetchUsers } from './api';
import type { User } from './store';
import {
  UserCategory,
  filterAll,
  filterUsersSlice,
  getAll,
  getAllUsers,
  getCategories,
  getCategory,
  getEndorsedByYou,
  getReportedByYou,
  getShowReportedUsers,
  getUsers,
  setCategory,
  setSearchResults,
  toggleCategory,
  toggleEndorsedByYou,
  toggleReportedByYou,
  toggleShowReportedUsers,
} from './store';
import type { ApplicationState } from '../../store';

const INITIAL_USER_CATEGORIES = Object.values(UserCategory) as UserCategory[];

const initialState: {
  searchResults: { users: User[] };
  endorsedByYou: boolean;
  reportedByYou: boolean;
  showReportedUsers: boolean;
  categories: UserCategory[];
} = {
  searchResults: { users: [] },
  endorsedByYou: false,
  reportedByYou: false,
  showReportedUsers: false,
  categories: INITIAL_USER_CATEGORIES,
};

describe('filterUsersSlice', () => {
  it('should toggle endorsedByYou', () => {
    let nextState = filterUsersSlice.reducer(
      initialState,
      toggleEndorsedByYou(),
    );
    expect(nextState.endorsedByYou).toBe(true);
    nextState = filterUsersSlice.reducer(nextState, toggleEndorsedByYou());
    expect(nextState.endorsedByYou).toBe(false);
  });

  it('should toggle reportedByYou', () => {
    let nextState = filterUsersSlice.reducer(
      initialState,
      toggleReportedByYou(),
    );
    expect(nextState.reportedByYou).toBe(true);
    nextState = filterUsersSlice.reducer(nextState, toggleReportedByYou());
    expect(nextState.reportedByYou).toBe(false);
  });

  it('should toggle showReportedUsers', () => {
    let nextState = filterUsersSlice.reducer(
      initialState,
      toggleShowReportedUsers(),
    );
    expect(nextState.showReportedUsers).toBe(true);
    nextState = filterUsersSlice.reducer(nextState, toggleShowReportedUsers());
    expect(nextState.showReportedUsers).toBe(false);
  });

  it('should set category', () => {
    initialState.categories = [];
    const nextState = filterUsersSlice.reducer(
      initialState,
      setCategory(UserCategory.Auditor),
    );
    expect(nextState.categories).toStrictEqual([UserCategory.Auditor]);
  });

  it('should toggle category', () => {
    initialState.categories = [];
    const nextState = filterUsersSlice.reducer(
      initialState,
      toggleCategory({ category: UserCategory.Auditor }),
    );
    expect(nextState.categories).toStrictEqual([UserCategory.Auditor]);
  });

  it('sets the search results', () => {
    const user = mock<User>();
    initialState.categories = [];
    const nextState = filterUsersSlice.reducer(
      initialState,
      setSearchResults({ users: [user] }),
    );
    expect(nextState.searchResults.users).toContainEqual([user]);
  });

  it('filter all resets to initial state', () => {
    initialState.categories = [];
    const nextState = filterUsersSlice.reducer(initialState, filterAll());
    expect(nextState.categories).toStrictEqual(INITIAL_USER_CATEGORIES);
  });

  it('should reset search', () => {
    const user = mock<User>();
    initialState.searchResults = { users: [user] };
    const nextState = filterUsersSlice.reducer(
      initialState,
      filterUsersSlice.actions.resetSearch(),
    );
    expect(nextState.searchResults.users).toStrictEqual([]);
  });

  it('should reset filters', () => {
    const user = mock<User>();
    const currentState = {
      searchResults: { users: [user] },
      endorsedByYou: true,
      reportedByYou: true,
      showReportedUsers: true,
      categories: [UserCategory.Auditor],
    };
    const nextState = filterUsersSlice.reducer(
      currentState,
      filterUsersSlice.actions.resetFilters(),
    );
    expect(nextState).toStrictEqual({
      searchResults: { users: [] },
      endorsedByYou: false,
      reportedByYou: false,
      showReportedUsers: false,
      categories: INITIAL_USER_CATEGORIES,
    });
  });

  it('should handle fetchUsers.fulfilled', () => {
    const usersPayload = [
      {
        id: '1',
        preferredName: 'John',
        website: 'example.com',
        endorsementCount: 5,
        disputeCount: 0,
        createdAt: '2022-05-05',
        rank: 3,
      },
    ];

    const action = { type: fetchUsers.fulfilled.type, payload: usersPayload };
    const nextState = filterUsersSlice.reducer(initialState, action);

    // Assertion
    expect(nextState.searchResults.users).toStrictEqual(
      usersPayload.map((userPayload) => ({
        id: userPayload.id,
        preferredName: userPayload.preferredName,
        website: userPayload.website,
        endorsementCount: userPayload.endorsementCount,
        disputeCount: userPayload.disputeCount,
        createdAt: userPayload.createdAt,
        rank: userPayload.rank,
      })),
    );
  });
});

describe('Selectors', () => {
  const initialApplicationState = mock<ApplicationState>();
  initialApplicationState.users = {
    searchResults: { users: [] },
    endorsedByYou: true,
    reportedByYou: false,
    showReportedUsers: true,
    categories: [
      UserCategory.Auditor,
      UserCategory.Builder,
      UserCategory.SecurityEngineer,
      UserCategory.SoftwareEngineer,
    ],
  };

  it('getAll should return true if all categories are selected', () => {
    const result = getAll(initialApplicationState);
    expect(result).toBe(true);
  });

  it('getCategories should return the categories array', () => {
    const result = getCategories(initialApplicationState);
    expect(result).toStrictEqual([
      UserCategory.Auditor,
      UserCategory.Builder,
      UserCategory.SecurityEngineer,
      UserCategory.SoftwareEngineer,
    ]);
  });

  it('getCategory should return true if the category is included', () => {
    const result = getCategory(UserCategory.Auditor)(initialApplicationState);
    expect(result).toBe(true);
  });

  it('getEndorsedByYou should return the value of endorsedByYou', () => {
    const result = getEndorsedByYou(initialApplicationState);
    expect(result).toBe(true);
  });

  it('getReportedByYou should return the value of reportedByYou', () => {
    const result = getReportedByYou(initialApplicationState);
    expect(result).toBe(false);
  });

  it('getShowReportedUsers should return the value of showReportedUsers', () => {
    const result = getShowReportedUsers(initialApplicationState);
    expect(result).toBe(true);
  });

  it('getUsers should return the users array from searchResults', () => {
    const result = getUsers(initialApplicationState);
    expect(result).toStrictEqual([]);
  });

  it('getAllUsers should return the first 1000 users sorted by rank', () => {
    const user1: User = {
      id: '1',
      rank: null,
      preferredName: 'User 1',
      website: 'https://example.com',
      endorsementCount: 0,
      disputeCount: 0,
      createdAt: '2021-09-01T00:00:00Z',
    };
    const user2: User = {
      id: '2',
      rank: 1,
      preferredName: 'User 2',
      website: 'https://example.com',
      endorsementCount: 0,
      disputeCount: 0,
      createdAt: '2021-09-01T00:00:00Z',
    };
    const user3: User = {
      id: '3',
      rank: null,
      preferredName: 'User 3',
      website: 'https://example.com',
      endorsementCount: 0,
      disputeCount: 0,
      createdAt: '2021-09-01T00:00:00Z',
    };
    const user4: User = {
      id: '4',
      rank: 5,
      preferredName: 'User 4',
      website: 'https://example.com',
      endorsementCount: 0,
      disputeCount: 0,
      createdAt: '2021-09-01T00:00:00Z',
    };
    const user5: User = {
      id: '5',
      rank: 4,
      preferredName: 'User 5',
      website: 'https://example.com',
      endorsementCount: 0,
      disputeCount: 0,
      createdAt: '2021-09-01T00:00:00Z',
    };
    const users = [user1, user2, user3, user4, user5];
    const applicationStateWithAllUsers = mock<ApplicationState>();
    applicationStateWithAllUsers.users = {
      searchResults: { users },
      endorsedByYou: true,
      reportedByYou: false,
      showReportedUsers: true,
      categories: [
        UserCategory.Auditor,
        UserCategory.Builder,
        UserCategory.SecurityEngineer,
        UserCategory.SoftwareEngineer,
      ],
    };
    const result = getAllUsers()(applicationStateWithAllUsers);
    expect(result).toStrictEqual([
      users[1],
      users[4],
      users[0],
      users[2],
      users[3],
    ]);
  });
});
