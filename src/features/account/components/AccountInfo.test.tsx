import { useEnsName } from 'wagmi';

import { AccountInfo } from './AccountInfo';
import { render } from '../../../utils/test-utils';

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
}));

describe('AccountInfo', () => {
  let mockUseEnsName: jest.Mock;

  beforeEach(() => {
    mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
  });

  it('renders', () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'name',
      isLoading: false,
    }));

    const { queryByTestId, queryByText } = render(
      <AccountInfo address="0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7" />,
    );

    expect(queryByTestId('account-info-loading')).not.toBeInTheDocument();
    expect(queryByTestId('account-info')).toBeInTheDocument();
    expect(queryByText('name')).toBeInTheDocument();
  });

  it('renders loading component if `useEnsName` is not complete', () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'name',
      isLoading: true,
    }));

    const { queryByTestId } = render(
      <AccountInfo address="0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7" />,
    );

    expect(queryByTestId('account-info-loading')).toBeInTheDocument();
  });

  it('renders trimmed address if ens name is not return from `useEnsName`', () => {
    mockUseEnsName.mockReturnValue({
      data: null,
      isLoading: false,
    });

    const { queryByText } = render(
      <AccountInfo address="0x6B24aE0ABbeb67058D07b891aF415f288eA57Cc7" />,
    );

    expect(queryByText('0x6B24a...57Cc7')).toBeInTheDocument();
  });
});
