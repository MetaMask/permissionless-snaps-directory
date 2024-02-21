/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type AccountTrustScore } from './types';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;

export const fetchTrustScoreForAllAccounts = createAsyncThunk(
  'accountTrustScore/fetchTrustScoreForAllAccounts',
  async (): Promise<AccountTrustScore[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/trustscores/accounts`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
);
