import { Button, Text } from '@chakra-ui/react';
import { ConnectKitButton } from 'connectkit';
import type { FunctionComponent } from 'react';

import { MetaMaskIcon } from './icons';

export const ConnectButton: FunctionComponent = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button
            leftIcon={<MetaMaskIcon width={{ base: '0', sm: '1.3rem' }} />}
            iconSpacing="0"
            onClick={show}
            width={isConnected ? '55%' : '50%'}
            height="2.5rem"
            padding="0.5rem 1rem"
            borderRadius="2.25rem"
            gap="0.5rem"
            backgroundColor="#0376C9"
          >
            {isConnected
              ? ensName ?? (
                  <Text fontSize="15px" color="white">
                    {truncatedAddress}
                  </Text>
                )
              : 'Connect'}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
