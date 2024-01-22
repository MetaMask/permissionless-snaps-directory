import { ConnectKitButton } from 'connectkit';
import { navigate } from 'gatsby';
import type { FunctionComponent } from 'react';

import { ConnectButtonInner } from './ConnectButtonInner';

export const ConnectButton: FunctionComponent = () => (
  <ConnectKitButton.Custom>
    {({ isConnected, show, truncatedAddress, ensName, address }) => (
      <ConnectButtonInner
        handleOnClick={
          isConnected
            ? async () =>
                navigate(`/account/?address=${address}`, { replace: true })
            : show
        }
        isConnected={isConnected}
        truncatedAddress={truncatedAddress}
        ensName={ensName}
      />
    )}
  </ConnectKitButton.Custom>
);
