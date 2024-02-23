import axios from 'axios';

import {
  fetchTrustScoreForAccountId,
  fetchTrustScoreForAllAccounts,
} from './api';
import { TrustScoreScope } from './types';

// Mock axios methods
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchTrustScoreForAccountId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch account trust scores for a accountId successfully', async () => {
    // Arrange
    const accountId = 'accountId';
    const mockTrustScores = [
      {
        subjectId: 'accountId',
        value: 1,
        trustScoreScope: TrustScoreScope.SoftwareDevelopment,
        result: 1,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: mockTrustScores,
    });

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForAccountId(accountId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchTrustScoreForAccountId.fulfilled(
        mockTrustScores,
        expect.anything(),
        expect.anything(),
      ),
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Arrange
    const accountId = 'accountId';
    const mockError = new Error('Failed to fetch account trust scores');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForAccountId(accountId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchTrustScoreForAccountId.fulfilled(
        [],
        expect.anything(),
        expect.anything(),
      ),
    );
  });
});

describe('fetchTrustScoreForAllAccounts', () => {
  const mockTrustScores = [
    {
      subjectId: 'accountId1',
      value: 1,
      trustScoreScope: TrustScoreScope.SoftwareDevelopment,
      result: 1,
    },
    {
      subjectId: 'accountId2',
      value: 2,
      trustScoreScope: TrustScoreScope.SoftwareSecurity,
      result: 2,
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch account trust scores for all accounts successfully', async () => {
    // Arrange
    mockedAxios.get.mockResolvedValueOnce({
      data: mockTrustScores,
    });

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForAllAccounts()(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchTrustScoreForAllAccounts.fulfilled(
        mockTrustScores,
        expect.anything(),
      ),
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Arrange
    const mockError = new Error('Failed to fetch accounts trust scores');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForAllAccounts()(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchTrustScoreForAllAccounts.fulfilled([], expect.anything()),
    );
  });
});
