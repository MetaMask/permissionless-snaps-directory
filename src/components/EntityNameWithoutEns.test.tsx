import { act } from '@testing-library/react';

import { EntityName } from './EntityName';
import { useVerifiableCredential } from '../hooks';
import { render } from '../utils/test-utils';

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: undefined,
    loading: false,
  }),
  createConfig: jest.fn(),
}));

const peerSubject = '0x04bC337f14ad1F7ED42A03f89C5e44eF1cE792f9';

describe('EntityName without ENS', () => {
  let mockUseVerifiableCredential: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockReturnValue({
      accountVCBuilder: {
        getAddressFromDid: jest
          .fn()
          .mockReturnValue('0x04bC337f14ad1F7ED42A03f89C5e44eF1cE792f9'),
      },
      snapVCBuilder: {
        getSnapIdFromDid: jest.fn().mockReturnValue('mockChecksumFoo'),
      },
    });
  });

  it('renders an account subject without ENS', async () => {
    const { queryByText } = await act(async () =>
      render(<EntityName subject={peerSubject} isSnap={false} />),
    );

    expect(queryByText('0x04bC3...792f9')).toBeInTheDocument();
  });

  it('renders an account subject without ENS and no address', async () => {
    const { queryByText } = await act(async () =>
      // @ts-expect-error: - Empty subject is intentional for testing
      render(<EntityName subject={undefined} isSnap={false} />),
    );

    expect(queryByText('Unknown')).toBeInTheDocument();
  });
});
