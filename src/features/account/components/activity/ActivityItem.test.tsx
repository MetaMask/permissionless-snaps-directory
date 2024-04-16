import { act } from '@testing-library/react';

import { ActivityItem } from './ActivityItem';
import { render } from '../../../../utils/test-utils';
import { SubjectType, Value } from '../../assertions/enums';
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
  subjectId: 'mockChecksum',
  subjectType: SubjectType.Snap,
  issuerId: '0xmockAddress',
  trustworthiness: [],
  statusReason: { type: 'Endorse', value: ['Value'] },
  creationAt: new Date(),
  issuanceDate: new Date(),
  reasons: ['Reason 1', 'Reason 2'],
  value: Value.Endorsement,
};

const peerAssertion: AccountAssertionState = {
  subjectId: '0xmockAddress',
  subjectType: SubjectType.User,
  issuerId: '0xmockAddress',
  trustworthiness: [
    { level: 1, reason: ['Reason'], scope: TrustworthinessScope.Honesty },
  ],
  creationAt: new Date(),
  issuanceDate: new Date(),
  reasons: ['Reason 1', 'Reason 2'],
  statusReason: { type: 'Endorse', value: ['Value'] },
  value: Value.Endorsement,
};

describe('ActivityItem', () => {
  it('renders a snap endorsement activity item', async () => {
    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a snap report activity item', async () => {
    const newSnapAssertion = {
      ...snapAssertion,
      value: Value.Dispute,
    };

    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={newSnapAssertion} />),
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
    const newPeerAssertion = {
      ...peerAssertion,
      value: Value.Dispute,
    };

    const { queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={newPeerAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a snap activity item even without knowing its type', async () => {
    const newSnapAssertion = { ...snapAssertion, value: 'Something' };

    const { queryByText, queryByTestId } = await act(async () =>
      // @ts-expect-error - We want to test the case where the value is unknown
      render(<ActivityItem assertion={newSnapAssertion} />),
    );

    expect(queryByText('Unknown activity')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a peer activity item even without knowing its type', async () => {
    const newPeerAssertion = { ...peerAssertion, value: 'Something' };

    const { queryByText, queryByTestId } = await act(async () =>
      // @ts-expect-error - We want to test the case where the value is unknown
      render(<ActivityItem assertion={newPeerAssertion} />),
    );

    expect(queryByText('Unknown activity')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a snap activity item even without knowing its reason', async () => {
    const newSnapAssertion = { ...snapAssertion, reasons: [] };

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={newSnapAssertion} />),
    );

    expect(queryByText('for')).not.toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders a peer activity item even without its reason', async () => {
    const newPeerAssertion = { ...peerAssertion, reasons: [] };

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={newPeerAssertion} />),
    );

    expect(queryByText('for')).not.toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders an activity item even with on single reason', async () => {
    const newPeerAssertion = { ...peerAssertion, reasons: ['Reason 1'] };

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={newPeerAssertion} />),
    );

    expect(queryByText(`for ${peerAssertion.reasons[0]}`)).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders an activity item even with multiple reasons', async () => {
    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={peerAssertion} />),
    );

    expect(
      queryByText(
        `for ${peerAssertion.reasons[0]} and ${peerAssertion.reasons[1]}`,
      ),
    ).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
