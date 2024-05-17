import { expect } from '@jest/globals';
import { act } from '@testing-library/react';
import { useAccount } from 'wagmi';

import { FilterTags } from './FilterTags';
import { useDispatch, useSelector } from '../../../../hooks';
import { VALID_ACCOUNT_1, render } from '../../../../utils/test-utils';
import {
  UserCategory,
  toggleCategory,
  toggleEndorsedByYou,
  toggleReportedByYou,
  toggleShowReportedUsers,
} from '../../store';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  createConfig: jest.fn(),
}));
jest.mock('../../../../hooks');

describe('FilterTags', () => {
  let mockUseAccount: jest.Mock;
  let mockUseSelector: jest.Mock;
  let mockUseDispatch: jest.Mock;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockUseAccount = useAccount as jest.Mock;
    mockUseAccount.mockClear();
    mockUseAccount.mockImplementation(() => ({
      address: VALID_ACCOUNT_1,
      isConnected: true,
    }));

    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();

    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.resolve({
        type: 'fulfilled',
      }),
    );
  });

  it('renders all filters and toggles them when clicked', () => {
    mockUseSelector.mockReturnValueOnce([
      UserCategory.SoftwareEngineer,
      UserCategory.SecurityEngineer,
      UserCategory.Auditor,
      UserCategory.Builder,
    ]);
    mockUseSelector.mockReturnValue(true);

    const { queryByTestId, queryByText } = render(<FilterTags />);
    expect(queryByText('Software Engineer')).toBeInTheDocument();
    expect(queryByText('Security Engineer')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
    expect(queryByText('Builder')).toBeInTheDocument();
    expect(queryByText('Endorsed by you')).toBeInTheDocument();
    expect(queryByText('Reported by you')).toBeInTheDocument();
    expect(queryByText('Reported users')).toBeInTheDocument();

    const filterEndorsedByYou = queryByTestId('filter-endorsed-by-you-close');
    if (filterEndorsedByYou) {
      act(() => {
        filterEndorsedByYou.click();
      });
    }
    expect(mockDispatch).toHaveBeenCalledWith(toggleEndorsedByYou());

    const filterReportedByYou = queryByTestId('filter-reported-by-you-close');
    if (filterReportedByYou) {
      act(() => {
        filterReportedByYou.click();
      });
    }
    expect(mockDispatch).toHaveBeenCalledWith(toggleReportedByYou());

    const filterShowReportedUsers = queryByTestId(
      'filter-reported-users-close',
    );
    if (filterShowReportedUsers) {
      act(() => {
        filterShowReportedUsers.click();
      });
    }
    expect(mockDispatch).toHaveBeenCalledWith(toggleShowReportedUsers());

    Object.values(UserCategory).forEach((category) => {
      const filter = queryByTestId(`filter-${category}-close`);
      if (filter) {
        act(() => {
          filter.click();
        });
      }
      expect(mockDispatch).toHaveBeenCalledWith(toggleCategory({ category }));
    });
  });

  it('renders no filters', () => {
    mockUseSelector.mockReturnValueOnce([]);
    mockUseSelector.mockReturnValue(false);

    const { queryByText } = render(<FilterTags />);
    expect(queryByText('Software Engineer')).not.toBeInTheDocument();
    expect(queryByText('Security Engineer')).not.toBeInTheDocument();
    expect(queryByText('Auditor')).not.toBeInTheDocument();
    expect(queryByText('Builder')).not.toBeInTheDocument();
    expect(queryByText('Endorsed by you')).not.toBeInTheDocument();
    expect(queryByText('Reported by you')).not.toBeInTheDocument();
    expect(queryByText('Reported users')).not.toBeInTheDocument();
  });

  it('renders even if fetchUsers fails', () => {
    mockUseSelector.mockReturnValueOnce([
      UserCategory.SoftwareEngineer,
      UserCategory.SecurityEngineer,
      UserCategory.Auditor,
      UserCategory.Builder,
    ]);
    mockUseSelector.mockReturnValue(true);
    const mockDispatchFailed = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatchFailed);
    mockDispatchFailed.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );
    const { queryByText } = render(<FilterTags />);
    expect(queryByText('Software Engineer')).toBeInTheDocument();
    expect(queryByText('Security Engineer')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
    expect(queryByText('Builder')).toBeInTheDocument();
    expect(queryByText('Endorsed by you')).toBeInTheDocument();
    expect(queryByText('Reported by you')).toBeInTheDocument();
    expect(queryByText('Reported users')).toBeInTheDocument();
  });

  it('renders partially when user is not connected', () => {
    mockUseAccount.mockImplementation(() => ({
      address: VALID_ACCOUNT_1,
      isConnected: false,
    }));
    mockUseSelector.mockReturnValueOnce([
      UserCategory.SoftwareEngineer,
      UserCategory.SecurityEngineer,
      UserCategory.Auditor,
      UserCategory.Builder,
    ]);
    mockUseSelector.mockReturnValue(true);
    const { queryByText } = render(<FilterTags />);
    expect(queryByText('Software Engineer')).toBeInTheDocument();
    expect(queryByText('Security Engineer')).toBeInTheDocument();
    expect(queryByText('Auditor')).toBeInTheDocument();
    expect(queryByText('Builder')).toBeInTheDocument();
    expect(queryByText('Reported users')).toBeInTheDocument();
  });
});
