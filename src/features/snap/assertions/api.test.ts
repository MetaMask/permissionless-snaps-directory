import axios from 'axios';
import { mock } from 'ts-mockito';

import { fetchSnapAssertionsForSnapId, createSnapAssertion } from './api';
import {
  type SnapAssertion,
  type SnapAssertionResponse,
  SnapCurrentStatus,
  SnapStatusReasonType,
} from './types';
import { type SignedAssertion } from '../../../utils';

// Mock axios methods
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchSnapAssertionsForSnapId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch snap assertions for a snapId successfully', async () => {
    // Arrange
    const snapId = 'snapId';
    const mockAssertions = [mock<SnapAssertion>()];

    mockedAxios.get.mockResolvedValueOnce({ data: mockAssertions });

    const dispatch = jest.fn();

    // Act
    await fetchSnapAssertionsForSnapId(snapId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchSnapAssertionsForSnapId.fulfilled(
        { snapId, assertions: mockAssertions },
        expect.anything(),
        expect.anything(),
      ),
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Arrange
    const snapId = 'snapId';
    const mockError = new Error('Failed to fetch snap assertions');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await fetchSnapAssertionsForSnapId(snapId)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchSnapAssertionsForSnapId.fulfilled(
        { snapId, assertions: [] },
        expect.anything(),
        expect.anything(),
      ),
    );
  });
});

describe('createSnapAssertion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create snap assertion successfully', async () => {
    // Arrange
    const mockData = mock<SignedAssertion>();
    const mockResponse: SnapAssertionResponse = {
      type: 'SnapAssertion',
      issuer: 'did:eth',
      credentialSubject: {
        id: 'snap://snapId',
        currentStatus: SnapCurrentStatus.Endorsed,
        statusReason: {
          type: SnapStatusReasonType.Endorse,
          value: [],
        },
      },
    };
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const dispatch = jest.fn();

    // Act
    await createSnapAssertion(mockData)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.post.mock.calls).toHaveLength(1);
    expect.objectContaining({
      type: 'snapAssertions/createSnapAssertion/fulfilled',
    });
  });

  it('should dispatch rejected when post call fails', async () => {
    // Arrange
    const mockData = mock<SignedAssertion>();
    const mockError = new Error('Failed to create snap assertion');
    mockedAxios.post.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await createSnapAssertion(mockData)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.post.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'snapAssertions/createSnapAssertion/rejected',
      }),
    );
  });

  it('should dispatch rejected when post call returns error status code', async () => {
    // Arrange
    const mockData = mock<SignedAssertion>();
    mockedAxios.post.mockResolvedValueOnce({ status: 500, data: {} });

    const dispatch = jest.fn();

    // Act
    await createSnapAssertion(mockData)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.post.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'snapAssertions/createSnapAssertion/rejected',
      }),
    );
  });
});
