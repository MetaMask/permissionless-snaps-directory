import { act } from '@testing-library/react';
import { navigate } from 'gatsby';
import type { FunctionComponent } from 'react';

import { ConnectButton } from './ConnectButton';
import { render } from '../utils/test-utils';

const mockShowModel = jest.fn();
const mockGetIsConnected = jest.fn().mockReturnValueOnce(false);

jest.mock('connectkit', () => ({
  ConnectKitButton: {
    Custom: ({ children }: { children: FunctionComponent }) =>
      children({
        isConnected: mockGetIsConnected(),
        show: mockShowModel,
        truncatedAddress: '0x...',
        ensName: 'mock.ens.name',
      }),
  },
}));

describe('ConnectKitButton.Custom', () => {
  it('renders', async () => {
    const { queryByText } = render(<ConnectButton />);

    expect(queryByText('Connect')).toBeInTheDocument();
  });

  it('trigger showModal when account is not connected', async () => {
    mockGetIsConnected.mockReset();
    mockGetIsConnected.mockReturnValueOnce(false);

    const { getByText } = render(<ConnectButton />);

    const button = getByText('Connect');

    await act(async () => act(() => button.click()));

    expect(mockShowModel).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledTimes(0);
  });

  it('trigger navigate when account is connected', async () => {
    mockGetIsConnected.mockReset();
    mockGetIsConnected.mockReturnValueOnce(true);

    const { getByText } = render(<ConnectButton />);

    const button = getByText('mock.ens.name');

    await act(async () => act(() => button.click()));

    expect(mockShowModel).toHaveBeenCalledTimes(0);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
