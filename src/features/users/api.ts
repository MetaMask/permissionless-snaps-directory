/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type User } from './types';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
);
