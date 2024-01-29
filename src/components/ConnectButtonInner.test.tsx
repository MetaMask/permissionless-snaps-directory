import { act } from '@testing-library/react';

import { ConnectButtonInner } from './ConnectButtonInner';
import { render } from '../utils/test-utils';

describe('ConnectButtonInner', () => {
  it('triggers `onClick` when the button is clicked', async () => {
    const btnClick = jest.fn();
    const { getByText } = render(
      <ConnectButtonInner handleOnClick={btnClick} isConnected={false} />,
    );

    const button = getByText('Connect');
    await act(async () => button.click());

    expect(btnClick).toHaveBeenCalledTimes(1);
  });

  describe('when MetaMask is not connected', () => {
    it('renders "Connect"', () => {
      const btnClick = jest.fn();
      const { queryByText } = render(
        <ConnectButtonInner handleOnClick={btnClick} isConnected={false} />,
      );

      expect(queryByText('Connect')).toBeInTheDocument();
    });
  });

  describe('when MetaMask connected', () => {
    describe('when an ENS name is provided', () => {
      it('renders ENS name', () => {
        const btnClick = jest.fn();
        const { queryByText } = render(
          <ConnectButtonInner
            handleOnClick={btnClick}
            isConnected={true}
            truncatedAddress="truncatedAddress"
            ensName="ensName"
          />,
        );

        expect(queryByText('ensName')).toBeInTheDocument();
      });
    });

    describe('when an ENS name is not provided', () => {
      it('renders the truncated address', () => {
        const btnClick = jest.fn();
        const { queryByText } = render(
          <ConnectButtonInner
            handleOnClick={btnClick}
            isConnected={true}
            truncatedAddress="truncatedAddress"
          />,
        );

        expect(queryByText('truncatedAddress')).toBeInTheDocument();
      });
    });
  });
});
