import { act } from '@testing-library/react';
import { useEnsName } from 'wagmi';

import { AccountTEEndosement } from './AccountTEEndosement';
import { render } from '../../utils/test-utils';

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
}));

const VALID_ACCOUNT_1 = '0x123';
const VALID_ACCOUNT_2 = '0x123';

describe('AccountTEEndosement', () => {
  let mockUseEnsName: jest.Mock;

  beforeEach(() => {
    mockUseEnsName = useEnsName as jest.Mock;
    mockUseEnsName.mockClear();
  });

  it('renders', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'name',
      isLoading: false,
    }));

    const { queryByText, getByText } = render(
      <AccountTEEndosement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endose').click();
      }),
    );

    expect(queryByText('Endose')).toBeInTheDocument();
    expect(queryByText('Software Security')).toBeInTheDocument();
    expect(queryByText('Software Development')).toBeInTheDocument();
  });

  it('assign trimed address to `trustEntity` when `useEnsName` is not ready or return null', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: null,
      isLoading: true,
    }));

    const { queryByText, getByText } = render(
      <AccountTEEndosement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endose').click();
      }),
    );

    expect(queryByText(VALID_ACCOUNT_1)).toBeInTheDocument();
  });

  it('assign ens name to `trustEntity` when `useEnsName` is return a name', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'mock.ens.name',
      isLoading: false,
    }));

    const { queryByText, getByText } = render(
      <AccountTEEndosement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endose').click();
      }),
    );

    expect(queryByText('mock.ens.name')).toBeInTheDocument();
  });

  it('dismiss the model when sign button clicked', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'mock.ens.name',
      isLoading: false,
    }));

    const { queryByText, getByText } = render(
      <AccountTEEndosement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endose').click();
      }),
    );

    await act(async () =>
      act(() => {
        getByText('Sign').click();
      }),
    );

    expect(queryByText('mock.ens.name')).not.toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'mock.ens.name',
      isLoading: false,
    }));

    const { queryByText, getByLabelText, getByText } = render(
      <AccountTEEndosement
        address={VALID_ACCOUNT_1}
        connectedAddress={VALID_ACCOUNT_2}
      />,
    );

    await act(async () =>
      act(() => {
        getByText('Endose').click();
      }),
    );

    await act(async () => {
      getByLabelText('Close').click();
    });

    expect(queryByText('mock.ens.name')).not.toBeInTheDocument();
  });
});
