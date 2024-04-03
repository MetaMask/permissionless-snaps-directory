import { act } from '@testing-library/react';
import { mock } from 'ts-mockito';

import { ActivitySection } from './ActivitySection';
import { useSelector } from '../../../../hooks';
import { createStore } from '../../../../store';
import { render } from '../../../../utils/test-utils';
import type { SnapAssertionState } from '../../assertions/store';

jest.mock('../../../../hooks', () => ({
  ...jest.requireActual('../../../../hooks'),
  useSelector: jest.fn(),
}));

jest.mock('./ActivityItem', () => ({
  ActivityItem: () => <div data-testid="activity-item" />,
}));

describe('ActivitySection', () => {
  let mockUseSelector: jest.Mock;

  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;
  });

  it('renders multiple activities', async () => {
    mockUseSelector.mockReturnValueOnce([
      mock<SnapAssertionState>,
      mock<SnapAssertionState>,
    ]);

    const store = createStore();

    const { queryAllByTestId } = await act(async () =>
      render(<ActivitySection latestChecksum={'snap1checksum'} />, store),
    );

    expect(queryAllByTestId('activity-item')).toHaveLength(2);
  });

  it('hides when no activity', async () => {
    const store = createStore();

    const { queryByTestId } = await act(async () =>
      render(<ActivitySection latestChecksum={'snap1checksum'} />, store),
    );

    expect(queryByTestId('activity-item')).not.toBeInTheDocument();
  });
});
