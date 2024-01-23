import { createSlice } from '@reduxjs/toolkit';

export type ReportUser = {
  account: string;
  reason: string[];
};

export type AccountEntity = {
  userCircle: string[];
  reportUsers: ReportUser[];
};

export type AccountProfileState = {
  // Entity relative
  userAccount: AccountEntity;

  // UI control relative
  addToUserModalOpen: boolean;
  reportUserModalOpen: boolean;
};

const initialState: AccountProfileState = {
  // Entity relative
  userAccount: {
    userCircle: [],
    reportUsers: [],
  },

  // UI control relative
  addToUserModalOpen: false,
  reportUserModalOpen: false,
};

export const accountProfileSlice = createSlice({
  name: 'accountProfile',
  initialState,
  reducers: {
    // Entity relative
    setUserAccount: (state, action) => {
      state.userAccount = action.payload;
    },

    addUserToUserCircle: (state, action) => {
      state.userAccount.userCircle.push(action.payload);
    },

    addReportUser: (state, action) => {
      state.userAccount.reportUsers.push(action.payload);
    },

    // UI control relative
    setAddToUserModalOpen: (state, action) => {
      state.addToUserModalOpen = action.payload;
    },

    setReportUserModalOpen: (state, action) => {
      state.reportUserModalOpen = action.payload;
    },
  },
});

export const {
  setUserAccount,
  addUserToUserCircle,
  addReportUser,
  setAddToUserModalOpen,
  setReportUserModalOpen,
} = accountProfileSlice.actions;
