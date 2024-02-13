import axios from 'axios';

import { fetchTrustScoreForSnapId } from './api';

jest.mock('axios');

describe('fetchTrustScoreForSnapId', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch trust score for a snapId successfully', async () => {
    // Arrange
    const snapId = 'snapId';
    const mockResponse = {
      data: [
        {
          subjectId: 'snap://snapId',
          value: 5,
          trustScoreScope: '',
          result: 5,
        },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForSnapId(snapId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchTrustScoreForSnapId.fulfilled(
        mockResponse.data[0] as any,
        expect.anything(),
        expect.anything(),
      ),
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Arrange
    const snapId = 'snapId';
    const mockError = new Error('Failed to fetch trust score');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForSnapId(snapId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchTrustScoreForSnapId.fulfilled(
        {
          result: -1,
          subjectId: 'snap://snapId',
          trustScoreScope: '',
          value: -1,
        },
        expect.anything(),
        expect.anything(),
      ),
    );
  });

  it('should handle empty respose with default values', async () => {
    // Arrange
    const snapId = 'snapId';
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const dispatch = jest.fn();

    // Act
    await fetchTrustScoreForSnapId(snapId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchTrustScoreForSnapId.fulfilled(
        {
          result: -1,
          subjectId: 'snap://snapId',
          trustScoreScope: '',
          value: -1,
        },
        expect.anything(),
        expect.anything(),
      ),
    );
  });
});
