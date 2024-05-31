/* eslint-disable no-restricted-globals */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { UserCategory } from './store';
import type { User } from './types';
import { FilterType } from './types';

const BASE_URL = process.env.GATSBY_INDEXER_API_BASE_URL;

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (filterArgs: {
    categories: UserCategory[];
    endorsedByYou: boolean;
    reportedByYou: boolean;
    showReportedUsers: boolean;
    userId: string | undefined;
  }): Promise<User[]> => {
    const filterTypes: FilterType[] = [];
    filterArgs.categories.forEach((category) => {
      switch (category) {
        case UserCategory.SoftwareEngineer:
          filterTypes.push(FilterType.SoftwareEngineers);
          break;
        case UserCategory.SecurityEngineer:
          filterTypes.push(FilterType.SecurityEngineers);
          break;
        case UserCategory.Builder:
          filterTypes.push(FilterType.Builders);
          break;
        default:
          filterTypes.push(FilterType.Auditors);
          break;
      }
    });
    if (filterArgs.endorsedByYou) {
      filterTypes.push(FilterType.EndorsedBy);
    }
    if (filterArgs.reportedByYou) {
      filterTypes.push(FilterType.ReportedBy);
    }
    if (filterArgs.showReportedUsers) {
      filterTypes.push(FilterType.ReportedUsers);
    }
    try {
      const filtersQuery = `?filters=${
        filterTypes.length > 0 ? JSON.stringify(filterTypes) : '[]'
      }`;
      const userIdQuery = filterArgs.userId
        ? `&userId=${filterArgs.userId}`
        : '';
      const response = await axios.get(
        `${BASE_URL}/users${filtersQuery}${userIdQuery}`,
      );
      return response.data;
    } catch (error) {
      return [];
    }
  },
);
