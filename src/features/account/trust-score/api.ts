/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type AccountTrustScore } from './types';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;

export const fetchTrustScoreForAccountId = createAsyncThunk(
  'accountTrustScore/fetchTrustScoreForAccountId',
  async (accountId: string): Promise<AccountTrustScore[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/trustscores/${accountId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
);
