import { act } from '@testing-library/react';

import { EntityName } from './EntityName';
import { useVerifiableCredential } from '../hooks';
import { createStore } from '../store';
import { getMockSnap, render } from '../utils/test-utils';

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useEnsName: () => ({
    data: 'test.eth',
    loading: false,
  }),
  createConfig: jest.fn(),
}));

const snapSubject = 'mockChecksumFoo';
const peerSubject = '0x04bC337f14ad1F7ED42A03f89C5e44eF1cE792f9';

describe('ActivitySubject', () => {
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

  it('renders a snap subject', async () => {
    const fooSnap = getMockSnap({
      snapId: 'foo-snap',
      name: 'foo-snap',
      versions: [{ version: '1.0.0', checksum: 'mockChecksumFoo' }],
    }).snap;

    const store = createStore({
      snaps: {
        snaps: [fooSnap],
      },
    });

    const { queryByText } = await act(async () =>
      render(<EntityName subject={snapSubject} isSnap={true} />, store),
    );

    expect(queryByText('foo-snap')).toBeInTheDocument();
  });

  it('renders a snap subject even if the version is unknown', async () => {
    const fooSnap = getMockSnap({
      snapId: 'foo-snap',
      name: 'foo-snap',
      versions: [{ version: '1.0.0', checksum: 'mockChecksumBar' }],
    }).snap;

    const store = createStore({
      snaps: {
        snaps: [fooSnap],
      },
    });

    const { queryByText } = await act(async () =>
      render(<EntityName subject={snapSubject} isSnap={true} />, store),
    );

    expect(queryByText('Unknown')).toBeInTheDocument();
  });

  it('renders an account subject with ENS', async () => {
    const { queryByText } = await act(async () =>
      render(<EntityName subject={peerSubject} isSnap={false} />),
    );

    expect(queryByText('test.eth')).toBeInTheDocument();
  });

  it('renders pre-specified title', async () => {
    const { queryByText } = await act(async () =>
      render(
        <EntityName
          subject={peerSubject}
          isSnap={false}
          title={'cool title'}
        />,
      ),
    );

    expect(queryByText('cool title')).toBeInTheDocument();
  });

  it('renders an item without surrounding margin', async () => {
    const { queryByText } = await act(async () =>
      render(
        <EntityName subject={peerSubject} isSnap={false} noMargin={true} />,
      ),
    );

    const item = queryByText('test.eth');
    expect(item).toBeInTheDocument();
  });
});
