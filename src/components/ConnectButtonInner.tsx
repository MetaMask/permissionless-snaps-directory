import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { ConnectButtonAvatar } from './ConnectButtonAvatar';

export type ConnectButtonInnerProps = {
  handleOnClick?: (() => void) | undefined;
  isConnected: boolean;
  ensName?: string | undefined;
  truncatedAddress?: string | undefined;
};

export const ConnectButtonInner: FunctionComponent<ConnectButtonInnerProps> = ({
  handleOnClick,
  isConnected,
  ensName,
  truncatedAddress,
}) => {
  return (
    <Button
      variant={isConnected ? 'connected' : 'connect'}
      leftIcon={
        <ConnectButtonAvatar isConnected={isConnected} isFallback={!ensName} />
      }
      iconSpacing="2"
      onClick={handleOnClick}
      width={isConnected ? '55%' : '50%'}
    >
      {isConnected ? ensName ?? truncatedAddress : <Trans>Connect</Trans>}
    </Button>
  );
};
