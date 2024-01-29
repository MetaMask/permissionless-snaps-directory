import { act } from '@testing-library/react';
import { ConnectKitButton } from 'connectkit';
import { navigate } from 'gatsby';

import { ConnectButton } from './ConnectButton';
import { render } from '../utils/test-utils';

jest.mock('connectkit', () => ({
  ConnectKitButton: {
    Custom: jest.fn(),
  },
}));

describe('ConnectKitButton.Custom', () => {
  const buildMockConnectButton = (isConnected = false) => {
    const showModelSpy = jest.fn();
    const mockComponent: jest.Mock = ConnectKitButton.Custom as jest.Mock;

    mockComponent.mockImplementation(({ children }) =>
      children({
        isConnected,
        show: showModelSpy,
        truncatedAddress: '0x...',
        ensName: 'mock.ens.name',
      }),
    );

    return {
      component: mockComponent,
      showModelSpy,
    };
  };

  it('renders', () => {
    buildMockConnectButton(false);

    const { queryByText } = render(<ConnectButton />);

    expect(queryByText('Connect')).toBeInTheDocument();
  });

  it('trigger showModal when account is not connected', async () => {
    const { showModelSpy } = buildMockConnectButton(false);

    const { getByText } = render(<ConnectButton />);

    const button = getByText('Connect');

    await act(async () => button.click());

    expect(showModelSpy).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledTimes(0);
  });

  it('trigger navigate when account is connected', async () => {
    const { showModelSpy } = buildMockConnectButton(true);

    const { getByText } = render(<ConnectButton />);

    const button = getByText('mock.ens.name');

    await act(async () => button.click());

    expect(showModelSpy).toHaveBeenCalledTimes(0);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
