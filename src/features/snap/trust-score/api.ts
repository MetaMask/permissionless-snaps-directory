/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type SnapTrustScore } from './types';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;

export const fetchTrustScoreForSnapId = createAsyncThunk(
  'snapTrustScore/fetchTrustScoreForSnapId',
  async (snapId: string): Promise<SnapTrustScore> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/trustscores/id/snap://${snapId}`,
      );
      if (response.data.length === 0) {
        return {
          subjectId: `snap://${snapId}`,
          value: -1,
          trustScoreScope: '',
          result: -1,
        };
      }
      return response.data[0];
    } catch (error) {
      return {
        subjectId: `snap://${snapId}`,
        value: -1,
        trustScoreScope: '',
        result: -1,
      };
    }
  },
);
