import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { ConnectKitButton } from 'connectkit';
import type { FunctionComponent } from 'react';

import { MetaMaskIcon, AvatarIcon, AvatarFallbackIcon } from './icons';

export type CustomConnectButtonProps = {
  handleOnClick?: (() => void) | undefined;
  isConnected: boolean;
  ensName?: string | undefined;
  truncatedAddress?: string | undefined;
};

export const CustomConnectButton: FunctionComponent<
  CustomConnectButtonProps
> = ({ handleOnClick, isConnected, ensName, truncatedAddress }) => {
  let icon = <MetaMaskIcon width={{ base: '0', sm: '1.3rem' }} />;
  if (isConnected) {
    if (ensName) {
      icon = <AvatarIcon width={{ base: '0', sm: '1.3rem' }} />;
    } else {
      icon = <AvatarFallbackIcon width={{ base: '0', sm: '1.3rem' }} />;
    }
  }

  return (
    <Button
      variant={isConnected ? 'connected' : 'connect'}
      leftIcon={icon}
      iconSpacing="0"
      onClick={handleOnClick}
      width={isConnected ? '55%' : '50%'}
      gap="2"
    >
      {isConnected ? ensName ?? truncatedAddress : <Trans>Connect</Trans>}
    </Button>
  );
};

export const ConnectButton: FunctionComponent = () => (
  <ConnectKitButton.Custom>
    {({ isConnected, show, truncatedAddress, ensName }) => (
      <CustomConnectButton
        handleOnClick={show}
        isConnected={isConnected}
        truncatedAddress={truncatedAddress}
        ensName={ensName}
      />
    )}
  </ConnectKitButton.Custom>
);
