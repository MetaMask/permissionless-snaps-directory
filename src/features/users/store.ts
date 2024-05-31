import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchUsers } from './api';
import { type ApplicationState } from '../../store';

export type User = {
  id: string;
  preferredName: string | undefined;
  website: string | undefined;
  endorsementCount: number;
  disputeCount: number;
  createdAt: string;
  rank: number | null;
};

export enum UserCategory {
  Auditor = 'auditor',
  Builder = 'builder',
  SecurityEngineer = 'security engineers',
  SoftwareEngineer = 'software expert',
}

export type UsersState = {
  searchResults: { users: User[] };
  endorsedByYou: boolean;
  reportedByYou: boolean;
  showReportedUsers: boolean;
  categories: UserCategory[];
};

const INITIAL_USER_CATEGORIES = Object.values(UserCategory) as UserCategory[];

const initialState: UsersState = {
  searchResults: { users: [] },
  endorsedByYou: false,
  reportedByYou: false,
  showReportedUsers: false,
  categories: INITIAL_USER_CATEGORIES,
};

export const filterUsersSlice = createSlice({
  name: 'filterUsers',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<{ users: User[] }>) => {
      state.searchResults = action.payload;
    },
    resetSearch: (state) => {
      state.searchResults = { users: [] };
    },
    filterAll: (state) => {
      state.categories = INITIAL_USER_CATEGORIES;
    },
    toggleEndorsedByYou: (state) => {
      state.endorsedByYou = !state.endorsedByYou;
      if (state.endorsedByYou) {
        state.categories = [];
      }
    },
    toggleReportedByYou: (state) => {
      state.reportedByYou = !state.reportedByYou;
      if (state.reportedByYou) {
        state.categories = [];
      }
    },
    toggleShowReportedUsers: (state) => {
      state.showReportedUsers = !state.showReportedUsers;
      if (state.showReportedUsers) {
        state.categories = [];
      }
    },
    toggleCategory: (
      state,
      action: PayloadAction<{ category: UserCategory }>,
    ) => {
      const { category } = action.payload;
      // If the category is already selected, remove it.
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter(
          (value) => value !== category,
        );
      } else {
        // Otherwise, add it by creating a new array with the updated value.
        state.categories = [...state.categories, category];
      }
    },
    setCategory: (state, action: PayloadAction<UserCategory>) => {
      state.categories = [action.payload];
    },
    resetFilters: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.searchResults.users = action.payload.map((usersPayload) => ({
        id: usersPayload.id,
        preferredName: usersPayload.preferredName,
        website: usersPayload.website,
        endorsementCount: usersPayload.endorsementCount,
        disputeCount: usersPayload.disputeCount,
        createdAt: usersPayload.createdAt,
        rank: usersPayload.rank,
      }));
    });
  },
});

export const {
  setSearchResults,
  resetSearch,
  filterAll,
  toggleEndorsedByYou,
  toggleReportedByYou,
  toggleShowReportedUsers,
  toggleCategory,
  setCategory,
  resetFilters,
} = filterUsersSlice.actions;

export const getAll = createSelector(
  (state: ApplicationState) => state.users,
  ({ categories }) => categories.length === INITIAL_USER_CATEGORIES.length,
);

export const getCategories = createSelector(
  (state: ApplicationState) => state.users,
  ({ categories }) => categories,
);

export const getCategory = (category: UserCategory) =>
  createSelector(
    (state: ApplicationState) => state.users,
    ({ categories }) => categories.includes(category),
  );

export const getEndorsedByYou = createSelector(
  (state: ApplicationState) => state.users,
  ({ endorsedByYou }) => endorsedByYou,
);

export const getReportedByYou = createSelector(
  (state: ApplicationState) => state.users,
  ({ reportedByYou }) => reportedByYou,
);

export const getShowReportedUsers = createSelector(
  (state: ApplicationState) => state.users,
  ({ showReportedUsers }) => showReportedUsers,
);

// Selector to get users from the store
export const getUsers = createSelector(
  (state: ApplicationState) => state.users,
  ({ searchResults }) => searchResults.users,
);

export const getAllUsers = () =>
  createSelector(getUsers, (users) =>
    [...users]
      .sort((a, b) => (a.rank ?? users.length) - (b.rank ?? users.length))
      .slice(0, 1000),
  );
