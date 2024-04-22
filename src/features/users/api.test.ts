import axios from 'axios';

import { fetchAllUsers } from './api';

// Mock axios methods
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAllUsers', () => {
  const mockUsers = [
    {
      id: 'accountId1',
      preferredName: 'User 1',
      website: 'https://user1.com',
      endorsementCount: 1,
      disputeCount: 0,
      createdAt: '2021-01-01',
      rank: 1,
    },
    {
      id: 'accountId2',
      preferredName: 'User 2',
      website: 'https://user2.com',
      endorsementCount: 2,
      disputeCount: 1,
      createdAt: '2021-01-02',
      rank: 2,
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all accounts successfully', async () => {
    // Arrange
    mockedAxios.get.mockResolvedValueOnce({
      data: mockUsers,
    });

    const dispatch = jest.fn();

    // Act
    await fetchAllUsers()(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchAllUsers.fulfilled(mockUsers, expect.anything()),
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Arrange
    const mockError = new Error('Failed to fetch accounts');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await fetchAllUsers()(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchAllUsers.fulfilled([], expect.anything()),
    );
  });
});
