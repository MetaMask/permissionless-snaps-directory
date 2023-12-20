import { ConnectKitButton } from 'connectkit';
import type { FunctionComponent } from 'react';

import { ConnectButtonInner } from './ConnectButtonInner';

export const ConnectButton: FunctionComponent = () => (
  <ConnectKitButton.Custom>
    {({ isConnected, show, truncatedAddress, ensName }) => (
      <ConnectButtonInner
        handleOnClick={show}
        isConnected={isConnected}
        truncatedAddress={truncatedAddress}
        ensName={ensName}
      />
    )}
  </ConnectKitButton.Custom>
);
