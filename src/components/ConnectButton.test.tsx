import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, act } from '@testing-library/react';

import { ConnectButton, CustomConnectButton } from './ConnectButton';
import { messages } from '../locales/en/messages';

i18n.load('en', messages);
i18n.activate('en');

describe('ConnectKitButton.Custom', () => {
  it('renders', () => {
    const { getByText } = render(
      <I18nProvider i18n={i18n}>
        <ConnectButton />
      </I18nProvider>,
    );
    expect(getByText('Connect')).toBeInTheDocument();
  });
});

describe('CustomConnectButton', () => {
  let btnClick: jest.Mock;

  beforeEach(() => {
    btnClick = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('trigger onClick when button clicked', async () => {
    const { getByText } = render(
      <I18nProvider i18n={i18n}>
        <CustomConnectButton
          handleOnClick={btnClick}
          isConnected={false}
          truncatedAddress={''}
          ensName={''}
        />
      </I18nProvider>,
    );
    const button = getByText('Connect');
    await act(async () => act(() => button.click()));
    expect(btnClick).toHaveBeenCalledTimes(1);
  });

  describe('when MetaMask not connected', () => {
    it('renders "Connect"', () => {
      const { getByText } = render(
        <I18nProvider i18n={i18n}>
          <CustomConnectButton
            handleOnClick={btnClick}
            isConnected={false}
            truncatedAddress={''}
            ensName={''}
          />
        </I18nProvider>,
      );
      expect(getByText('Connect')).toBeInTheDocument();
    });
  });

  describe('when MetaMask connected', () => {
    describe('when ensName provided', () => {
      it('renders ensName', () => {
        const { getByText } = render(
          <I18nProvider i18n={i18n}>
            <CustomConnectButton
              handleOnClick={btnClick}
              isConnected={true}
              truncatedAddress={'truncatedAddress'}
              ensName={'ensName'}
            />
          </I18nProvider>,
        );
        expect(getByText('ensName')).toBeInTheDocument();
      });
    });

    describe('when ensName not provided', () => {
      it('renders truncatedAddress', () => {
        const { getByText } = render(
          <I18nProvider i18n={i18n}>
            <CustomConnectButton
              handleOnClick={btnClick}
              isConnected={true}
              truncatedAddress={'truncatedAddress'}
            />
          </I18nProvider>,
        );
        expect(getByText('truncatedAddress')).toBeInTheDocument();
      });
    });
  });
});
