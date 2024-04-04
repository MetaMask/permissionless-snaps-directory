import { act } from '@testing-library/react';

import { ActivityItem } from './ActivityItem';
import { render } from '../../../../utils/test-utils';
import type { SnapAssertionState } from '../../assertions/store';
import {
  SnapCurrentStatus,
  SnapStatusReasonType,
} from '../../assertions/types';

jest.mock('../../../../hooks', () => ({
  ...jest.requireActual('../../../../hooks'),
  useSelector: jest.fn(),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('../../../../components/EntityName', () => ({
  EntityName: () => <div data-testid="entity-name" />,
}));

const snapEndorsementAssertion: SnapAssertionState = {
  snapId: 'snap://mockChecksum',
  issuer: '0xmockAddress1',
  statusReason: { type: SnapStatusReasonType.Endorse, value: ['Reason'] },
  creationAt: new Date(),
  issuanceDate: new Date(),
  currentStatus: SnapCurrentStatus.Endorsed,
};

const snapReportAssertion: SnapAssertionState = {
  snapId: 'snap://mockChecksum',
  issuer: '0xmockAddress2',
  statusReason: { type: SnapStatusReasonType.Malicious, value: ['Reason'] },
  creationAt: new Date(),
  issuanceDate: new Date(),
  currentStatus: SnapCurrentStatus.Disputed,
};

describe('ActivityItem', () => {
  it('renders a snap endorsement activity item', async () => {
    const { queryByTestId, queryByText } = await act(async () =>
      render(<ActivityItem assertion={snapEndorsementAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
    expect(queryByText('Endorsed by')).toBeInTheDocument();
  });

  it('renders a snap report activity item', async () => {
    const { queryByTestId, queryByText } = await act(async () =>
      render(<ActivityItem assertion={snapReportAssertion} />),
    );

    expect(queryByTestId('entity-name')).toBeInTheDocument();
    expect(queryByText('Reported by')).toBeInTheDocument();
  });

  it('renders an activity item even with multiple reasons', async () => {
    snapEndorsementAssertion.statusReason.value = [
      'Reason1',
      'Reason2',
      'Reason3',
    ];

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapEndorsementAssertion} />),
    );

    expect(queryByText('for Reason1, Reason2 and Reason3')).toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });

  it('renders an activity item even without any reasons', async () => {
    snapEndorsementAssertion.statusReason.value = undefined;

    const { queryByText, queryByTestId } = await act(async () =>
      render(<ActivityItem assertion={snapEndorsementAssertion} />),
    );

    expect(queryByText('for')).not.toBeInTheDocument();
    expect(queryByTestId('entity-name')).toBeInTheDocument();
  });
});
