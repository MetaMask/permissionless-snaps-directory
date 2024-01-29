import { act } from '@testing-library/react';
import { useEnsName } from 'wagmi';

import { AccountReport } from './AccountReport';
import { render } from '../../utils/test-utils';

jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
}));

const VALID_ACCOUNT_1 = '0x123';

describe('AccountReport', () => {
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
      <AccountReport address={VALID_ACCOUNT_1} />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    expect(queryByText('Report')).toBeInTheDocument();
    expect(queryByText('Scamming')).toBeInTheDocument();
    expect(queryByText('Hacking')).toBeInTheDocument();
    expect(queryByText('Harassment')).toBeInTheDocument();
    expect(queryByText('Disinformation')).toBeInTheDocument();
    expect(queryByText('Other')).toBeInTheDocument();
  });

  it('assign trimed address to `reportEntity` when `useEnsName` is not ready or return null', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: null,
      isLoading: true,
    }));

    const { queryByText, getByText } = render(
      <AccountReport address={VALID_ACCOUNT_1} />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    expect(queryByText(VALID_ACCOUNT_1)).toBeInTheDocument();
  });

  it('assign ens name to `reportEntity` when `useEnsName` returns a name', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'mock.ens.name',
      isLoading: false,
    }));

    const { queryByText, getByText } = render(
      <AccountReport address={VALID_ACCOUNT_1} />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    expect(queryByText('mock.ens.name')).toBeInTheDocument();
  });

  it('dismiss the modal when sign button clicked', async () => {
    mockUseEnsName.mockImplementation(() => ({
      data: 'mock.ens.name',
      isLoading: false,
    }));

    const { queryByText, getByText } = render(
      <AccountReport address={VALID_ACCOUNT_1} />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    await act(async () =>
      act(() => {
        getByText('Scamming').click();
        getByText('Sign to report').click();
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
      <AccountReport address={VALID_ACCOUNT_1} />,
    );

    await act(async () =>
      act(() => {
        getByText('Report').click();
      }),
    );

    await act(async () => {
      getByLabelText('Close').click();
    });

    expect(queryByText('mock.ens.name')).not.toBeInTheDocument();
  });
});
