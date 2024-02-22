import { act } from 'react-dom/test-utils';

import CommunityPage from './community';
import { useDispatch } from '../hooks';
import { render } from '../utils/test-utils';

jest.mock('../hooks');

jest.mock('../features', () => ({
  CommunityList: () => <div data-testid="community-list" />,
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
    mockDispatch.mockImplementationOnce(async () => Promise.resolve({}));
    const { queryByTestId } = await act(async () => render(<CommunityPage />));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(queryByTestId('community-list')).toBeInTheDocument();
  });

  it('should render even if fetchTrustScoreForAllAccounts action fails', async () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );
    const { queryByTestId } = await act(async () => render(<CommunityPage />));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(queryByTestId('community-list')).toBeInTheDocument();
  });
});
