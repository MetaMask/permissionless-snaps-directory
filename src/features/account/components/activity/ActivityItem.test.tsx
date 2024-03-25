import { act } from '@testing-library/react';

import { ActivityItem } from './ActivityItem';
import { render } from '../../../../utils/test-utils';
import type { AccountAssertionState } from '../../assertions/store';
import { TrustworthinessScope } from '../../assertions/types';

jest.mock('../../../../hooks', () => ({
  ...jest.requireActual('../../../../hooks'),
  useSelector: jest.fn(),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('../../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

const snapAssertion: AccountAssertionState = {
  accountId: 'snap://mockChecksum',
  issuer: '0xmockAddress',
  trustworthiness: [],
  statusReason: { type: 'Endorse', value: ['Value'] },
  creationAt: new Date(),
  issuanceDate: new Date(),
};

const peerAssertion: AccountAssertionState = {
  accountId: '0xmockAddress',
  issuer: '0xmockAddress',
  trustworthiness: [
    { level: 1, reason: ['Reason'], scope: TrustworthinessScope.Honesty },
  ],
  creationAt: new Date(),
  issuanceDate: new Date(),
};

describe('ActivityItem', () => {
  it('renders a snap endorsement activity item', async () => {
    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a snap report activity item', async () => {
    snapAssertion.statusReason = {
      ...snapAssertion.statusReason,
      type: 'Malicious',
    };
    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a peer endorsement activity item', async () => {
    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={peerAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a peer report activity item', async () => {
    peerAssertion.trustworthiness = [
      { level: -1, reason: ['Reason'], scope: TrustworthinessScope.Honesty },
    ];

    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={peerAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders an activity item even without knowing its type', async () => {
    snapAssertion.statusReason.type = 'Something';

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapAssertion} />),
    );

    expect(queryByText('Unknown activity')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a snap activity item even without knowing its reason', async () => {
    // @ts-expect-error - We want to test the case where the value is undefined
    snapAssertion.statusReason.value = undefined;

    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a peer activity item even without its reason', async () => {
    peerAssertion.trustworthiness = [];

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={peerAssertion} />),
    );

    expect(queryByText('for')).not.toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders an activity item even with multiple reasons', async () => {
    peerAssertion.trustworthiness = [
      {
        level: 1,
        scope: TrustworthinessScope.Honesty,
      },
      {
        level: 1,
        scope: TrustworthinessScope.SoftwareDevelopment,
      },
      {
        level: 1,
        scope: TrustworthinessScope.SoftwareSecurity,
      },
    ];

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={peerAssertion} />),
    );

    expect(
      queryByText(
        `for ${TrustworthinessScope.Honesty}, ${TrustworthinessScope.SoftwareDevelopment} and ${TrustworthinessScope.SoftwareSecurity}`,
      ),
    ).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
