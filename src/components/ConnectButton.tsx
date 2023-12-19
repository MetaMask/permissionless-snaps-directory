import { Button, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { ConnectKitButton } from 'connectkit';
import type { FunctionComponent } from 'react';

import { MetaMaskIcon } from './icons';

type CustomConnectButtonProps = {
  handleOnClick?: (() => void) | undefined;
  isConnected: boolean;
  ensName?: string | undefined;
  truncatedAddress?: string | undefined;
};

export const CustomConnectButton: FunctionComponent<
  CustomConnectButtonProps
> = ({ handleOnClick, isConnected, ensName, truncatedAddress }) => {
  return (
    <Button
      variant="primary"
      leftIcon={<MetaMaskIcon width={{ base: '0', sm: '1.3rem' }} />}
      iconSpacing="0"
      onClick={handleOnClick}
      width={isConnected ? '55%' : '50%'}
      height="2.5rem"
      gap="0.5rem"
    >
      {isConnected ? (
        ensName ?? <Text fontSize="sm">{truncatedAddress}</Text>
      ) : (
        <Trans>Connect</Trans>
      )}
    </Button>
  );
};

export const ConnectButton: FunctionComponent = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <CustomConnectButton
            handleOnClick={show}
            isConnected={isConnected}
            truncatedAddress={truncatedAddress}
            ensName={ensName}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
