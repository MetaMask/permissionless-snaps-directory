import { act, fireEvent } from '@testing-library/react';
import { useAccount } from 'wagmi';

import { Filter } from './Filter';
import { useDispatch, useSelector } from '../../../hooks';
import { createStore } from '../../../store';
import { render, VALID_ACCOUNT_1 } from '../../../utils/test-utils';
import {
  toggleEndorsedByYou,
  toggleReportedByYou,
  toggleShowReportedUsers,
} from '../store';

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  FilterTags: () => <div data-testid="filter-tags" />,
}));

jest.mock('../../../hooks');

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  createConfig: jest.fn(),
}));

describe('Filter Component', () => {
  const mockStore = createStore();
  let mockUseSelector: jest.Mock;
  let mockUseAccount: jest.Mock;
  let mockUseDispatch: jest.Mock;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
    mockUseAccount.mockImplementation(() => ({
      address: VALID_ACCOUNT_1,
      isConnected: true,
    }));
  });

  it('renders correctly', () => {
    mockUseSelector.mockReturnValue(true);
    const { getByLabelText, getByTestId, getByText } = render(
      <Filter />,
      mockStore,
    );
    const button = getByLabelText('Open filter menu');
    act(() => button.click());
    expect(getByText('Categories')).toBeInTheDocument();
    expect(getByText('Show reported users')).toBeInTheDocument();
    expect(getByText('Endorsed by you')).toBeInTheDocument();
    expect(getByText('Reported by you')).toBeInTheDocument();
    expect(getByText('Auditor')).toBeInTheDocument();
    expect(getByText('Builder')).toBeInTheDocument();
    expect(getByText('Security Engineer')).toBeInTheDocument();
    expect(getByText('Software Engineer')).toBeInTheDocument();
    expect(getByTestId('filter-tags')).toBeInTheDocument();
  });

  it('dispatches toggleEndorsedByYou action when Endorsed by you filter is clicked', () => {
    const { getByLabelText, getByText } = render(<Filter />, mockStore);
    const button = getByLabelText('Open filter menu');
    act(() => button.click());
    fireEvent.click(getByText('Endorsed by you'));
    expect(mockDispatch).toHaveBeenCalledWith(toggleEndorsedByYou());
  });

  it('dispatches toggleReportedByYou action when Reported by you filter is clicked', () => {
    const { getByLabelText, getByText } = render(<Filter />, mockStore);
    const button = getByLabelText('Open filter menu');
    act(() => button.click());
    fireEvent.click(getByText('Reported by you'));
    expect(mockDispatch).toHaveBeenCalledWith(toggleReportedByYou());
  });

  it('dispatches toggleShowReportedUsers action when Show reported users filter is clicked', () => {
    const { getByLabelText, getByText } = render(<Filter />, mockStore);
    const button = getByLabelText('Open filter menu');
    act(() => button.click());
    fireEvent.click(getByText('Show reported users'));
    expect(mockDispatch).toHaveBeenCalledWith(toggleShowReportedUsers());
  });
});
