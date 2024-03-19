import { act } from '@testing-library/react';

import { ActivitySubject } from './ActivitySubject';
import { useVerifiableCredential } from '../../../../hooks';
import { render } from '../../../../utils/test-utils';

jest.mock('../../../../hooks', () => ({
  ...jest.requireActual('../../../../hooks'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: undefined,
    loading: false,
  }),
  createConfig: jest.fn(),
}));

const peerSubject =
  'did:pkh:eip155:1:0x04bC337f14ad1F7ED42A03f89C5e44eF1cE792f9';

describe('ActivitySubject without ENS', () => {
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
      render(<ActivitySubject subject={peerSubject} />),
    );

    expect(queryByText('0x04bC••••92f9')).toBeInTheDocument();
  });
});
