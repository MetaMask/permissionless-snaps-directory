import axios from 'axios';
import { mock } from 'ts-mockito';

import {
  createAccountAssertion,
  fetchAccountAssertionsForAccountId,
} from './api';
import {
  type AccountAssertion,
  type AccountAssertionResponse,
  TrustCredentialType,
  TrustworthinessScope,
} from './types';
import { type SignedAssertion } from '../../../utils';

// Mock axios methods
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAccountAssertionsForAccountId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch account assertions for a accountId successfully', async () => {
    // Arrange
    const accountId = 'accountId';
    const mockAssertions = [mock<AccountAssertion>()];

    mockedAxios.get.mockResolvedValueOnce({
      data: { assertions: mockAssertions },
    });

    const dispatch = jest.fn();

    // Act
    await fetchAccountAssertionsForAccountId(accountId)(
      dispatch,
      jest.fn(),
      null,
    );

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenCalledWith(
      fetchAccountAssertionsForAccountId.fulfilled(
        { accountId, assertions: mockAssertions },
        expect.anything(),
        expect.anything(),
      ),
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Arrange
    const accountId = 'accountId';
    const mockError = new Error('Failed to fetch account assertions');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await fetchAccountAssertionsForAccountId(accountId)(
      dispatch,
      jest.fn(),
      null,
    );

    // Assert
    expect(mockedAxios.get.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchAccountAssertionsForAccountId.fulfilled(
        { accountId, assertions: [] },
        expect.anything(),
        expect.anything(),
      ),
    );
  });
});

describe('createAccountAssertion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create account assertion successfully', async () => {
    // Arrange
    const mockData = mock<SignedAssertion>();

    const mockResponse: AccountAssertionResponse = {
      type: [TrustCredentialType.TrustCredential],
      issuer: 'did:pkh:eip155:59144:0x6eCfD8252C19aC2Bf4bd1cBdc026C001C93E179D',
      credentialSubject: {
        id: 'did:pkh:eip155:59144:0x6eCfD8252C19aC2Bf4bd1cBdc026C001C93E179D',
        trustworthiness: [
          {
            scope: TrustworthinessScope.Honesty,
            level: 1,
            reason: ['reason1', 'reason2'],
          },
        ],
      },
    };
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const dispatch = jest.fn();

    // Act
    await createAccountAssertion(mockData)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.post.mock.calls).toHaveLength(1);
    expect.objectContaining({
      type: 'accountAssertions/createAccountAssertion/fulfilled',
    });
  });

  it('should dispatch rejected when post call fails', async () => {
    // Arrange
    const mockData = mock<SignedAssertion>();
    const mockError = new Error('Failed to create account assertion');
    mockedAxios.post.mockRejectedValueOnce(mockError);

    const dispatch = jest.fn();

    // Act
    await createAccountAssertion(mockData)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.post.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'accountAssertions/createAccountAssertion/rejected',
      }),
    );
  });

  it('should dispatch rejected when post call returns error status code', async () => {
    // Arrange
    const mockData = mock<SignedAssertion>();
    mockedAxios.post.mockResolvedValueOnce({ status: 500, data: {} });

    const dispatch = jest.fn();

    // Act
    await createAccountAssertion(mockData)(dispatch, jest.fn(), null);

    // Assert
    expect(mockedAxios.post.mock.calls).toHaveLength(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'accountAssertions/createAccountAssertion/rejected',
      }),
    );
  });
});
