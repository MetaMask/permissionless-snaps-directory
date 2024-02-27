import { createSlice } from '@reduxjs/toolkit';

export type AccountEntity = {
  userCircle: string[];
};

export type AccountProfileState = {
  // Entity relative
  userAccount: AccountEntity;

  // UI control relative
  addToUserModalOpen: boolean;
};

const initialState: AccountProfileState = {
  // Entity relative
  userAccount: {
    userCircle: [],
  },

  // UI control relative
  addToUserModalOpen: false,
};

export const accountProfileSlice = createSlice({
  name: 'accountProfile',
  initialState,
  reducers: {
    // Entity relative
    // setUserAccount: (state, action) => {
    //   state.userAccount = action.payload;
    // },

    addUserToUserCircle: (state, action) => {
      state.userAccount.userCircle.push(action.payload);
    },

    // UI control relative
    setAddToUserModalOpen: (state, action) => {
      state.addToUserModalOpen = action.payload;
    },
  },
});

export const { setUserAccount, addUserToUserCircle, setAddToUserModalOpen } =
  accountProfileSlice.actions;
