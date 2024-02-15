/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type SnapAssertion, type SnapAssertionResponse } from './types';
import { type SignedAssertion } from '../../../utils';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;
const API_KEY = process.env.GATSBY_INDEXER_API_KEY;

export const fetchSnapAssertionsForSnapId = createAsyncThunk(
  'snapAssertions/fetchSnapAssertionsForSnapId',
  async (snapId: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/assertions/snap://${snapId}`,
      );
      return { snapId, assertions: response.data.assertions } as {
        snapId: string;
        assertions: SnapAssertion[];
      };
    } catch (error) {
      return { snapId, assertions: [] } as {
        snapId: string;
        assertions: SnapAssertion[];
      };
    }
  },
);

export const createSnapAssertion = createAsyncThunk(
  'snapAssertions/createSnapAssertion',
  async (data: SignedAssertion) => {
    const response = await axios.post(`${BASE_URL}/assertions/snap`, data, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data as SnapAssertionResponse;
    }
    throw new Error(`Failed to create snap assertion: ${response.status}`);
  },
);
