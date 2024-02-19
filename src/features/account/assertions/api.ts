/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type AccountAssertion, type AccountAssertionResponse } from './types';
import { type SignedAssertion } from '../../../utils';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;
const API_KEY = 'wwGQDJrwt92dggKjLwlyR8OpqcNCLTSA14Duja4s';

export const fetchAccountAssertionsForAccountId = createAsyncThunk(
  'accountAssertions/fetchAccountAssertionsForAccountId',
  async (accountId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/assertions/${accountId}`);
      return { accountId, assertions: response.data.assertions } as {
        accountId: string;
        assertions: AccountAssertion[];
      };
    } catch (error) {
      return { accountId, assertions: [] } as {
        accountId: string;
        assertions: AccountAssertion[];
      };
    }
  },
);

export const createAccountAssertion = createAsyncThunk(
  'accountAssertions/createAccountAssertion',
  async (data: SignedAssertion) => {
    const response = await axios.post(`${BASE_URL}/assertions/account`, data, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data as AccountAssertionResponse;
    }
    throw new Error(`Failed to create account assertion: ${response.status}`);
  },
);
