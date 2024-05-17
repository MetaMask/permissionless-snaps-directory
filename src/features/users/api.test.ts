import axios from 'axios';
import { mock } from 'ts-mockito';

import { fetchUsers } from './api';
import type { User } from './store';
import { UserCategory } from './store';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchUsers', () => {
  const mockUsers = [mock<User>(), mock<User>()];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches users when all filters are applied', async () => {
    const filterArgs = {
      categories: [
        UserCategory.Auditor,
        UserCategory.Builder,
        UserCategory.SecurityEngineer,
        UserCategory.SoftwareEngineer,
      ],
      endorsedByYou: true,
      reportedByYou: true,
      showReportedUsers: true,
      userId: '123',
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUsers(filterArgs)(dispatch, getState, undefined);

    expect(mockedAxios.get.mock.calls[0]).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchUsers.fulfilled(mockUsers, expect.anything(), expect.anything()),
    );
  });

  it('fetches users when no filters are applied', async () => {
    const filterArgs: {
      categories: UserCategory[];
      endorsedByYou: boolean;
      reportedByYou: boolean;
      showReportedUsers: boolean;
      userId: string | undefined;
    } = {
      categories: [],
      endorsedByYou: false,
      reportedByYou: false,
      showReportedUsers: false,
      userId: undefined,
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUsers(filterArgs)(dispatch, getState, undefined);

    expect(mockedAxios.get.mock.calls[0]).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchUsers.fulfilled(mockUsers, expect.anything(), expect.anything()),
    );
  });

  it('handles error gracefully', async () => {
    const filterArgs = {
      categories: [UserCategory.SoftwareEngineer],
      endorsedByYou: false,
      reportedByYou: false,
      showReportedUsers: false,
      userId: undefined,
    };
    const errorMessage = 'Failed to fetch users';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchUsers(filterArgs)(dispatch, getState, undefined);

    expect(result.payload).toStrictEqual([]);
  });
});
