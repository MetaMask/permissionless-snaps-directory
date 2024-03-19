import { act } from '@testing-library/react';
import { mock } from 'ts-mockito';

import { ActivitySection } from './ActivitySection';
import { useSelector, useVerifiableCredential } from '../../../../hooks';
import { createStore } from '../../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../../utils/test-utils';
import type { AccountTrustScoreState } from '../../trust-score/store';

jest.mock('../../../../hooks', () => ({
  ...jest.requireActual('../../../../hooks'),
  useSelector: jest.fn(),
  useVerifiableCredential: jest.fn(),
}));

jest.mock('./ActivityItem', () => ({
  ActivityItem: () => <div data-testid="activity-item" />,
}));

describe('ActivitySection', () => {
  let mockUseSelector: jest.Mock;
  let mockUseVerifiableCredential: jest.Mock;

  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;

    mockUseVerifiableCredential = useVerifiableCredential as jest.Mock;
    mockUseVerifiableCredential.mockClear();
    mockUseVerifiableCredential.mockReturnValue({
      accountVCBuilder: {
        getSubjectDid: jest.fn().mockReturnValue('0xmockAddress'),
      },
    });
  });

  it('renders multiple activities', async () => {
    mockUseSelector.mockReturnValueOnce([
      mock<AccountTrustScoreState>,
      mock<AccountTrustScoreState>,
    ]);

    const store = createStore();

    const { queryAllByTestId } = await act(async () =>
      render(<ActivitySection address={VALID_ACCOUNT_1} />, store),
    );

    expect(queryAllByTestId('activity-item')).toHaveLength(2);
  });

  it('hides when no activity', async () => {
    const store = createStore();

    const { queryByTestId } = await act(async () =>
      render(<ActivitySection address={VALID_ACCOUNT_1} />, store),
    );

    expect(queryByTestId('activity-item')).not.toBeInTheDocument();
  });
});
