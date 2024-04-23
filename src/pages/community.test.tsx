import { act } from 'react-dom/test-utils';

import CommunityPage from './community';
import { useDispatch } from '../hooks';
import { render } from '../utils/test-utils';

jest.mock('../hooks');

jest.mock('../features', () => ({
  UsersList: () => <div data-testid="users-list" />,
}));

describe('CommunityPage', () => {
  let mockUseDispatch: jest.Mock;
  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
  });

  it('should dispatch fetchTrustScoreForAllAccounts action on mount', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementation(async () => Promise.resolve({}));
    const { queryByTestId } = await act(async () => render(<CommunityPage />));

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(queryByTestId('users-list')).toBeInTheDocument();
  });

  it('should render even if fetchTrustScoreForAllAccounts action fails', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    const { queryByTestId } = await act(async () => render(<CommunityPage />));

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(queryByTestId('users-list')).toBeInTheDocument();
  });

  it('should render even if fetchAssertionsForAllAccounts action fails', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    const { queryByTestId } = await act(async () => render(<CommunityPage />));

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(queryByTestId('users-list')).toBeInTheDocument();
  });

  it('should render even if fetchAllUsers action fails', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );
    const { queryByTestId } = await act(async () => render(<CommunityPage />));

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(queryByTestId('users-list')).toBeInTheDocument();
  });
});
