import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchAllUsers } from './api';
import { type ApplicationState } from '../../store';

export type UserState = {
  id: string;
  preferredName: string | undefined;
  website: string | undefined;
  endorsementCount: number;
  disputeCount: number;
  createdAt: string;
  rank: number | null;
};

export type UsersState = {
  users: UserState[];
};

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'fetchAllUsersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.map((usersPayload) => ({
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

// Selector to get users from the store
export const getUsers = createSelector(
  (state: ApplicationState) => state.users,
  ({ users }) => users,
);

export const getAllUsers = () =>
  createSelector(getUsers, (users) =>
    [...users]
      .sort((a, b) => (a.rank ?? users.length) - (b.rank ?? users.length))
      .slice(0, 1000),
  );
