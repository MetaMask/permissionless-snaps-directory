import type { FunctionComponent } from 'react';

import { MetaMaskIcon } from './icons';

export type ConnectButtonAvatarProps = {
  isConnected: boolean;
};

export const ConnectButtonAvatar: FunctionComponent<
  ConnectButtonAvatarProps
> = ({ isConnected }) => {
  // TODO: Add Avatar Icon if Avatar Icon is ready
  if (isConnected) {
    return null;
  }
  return (
    <MetaMaskIcon
      width={{ base: '0', sm: '1.3rem' }}
      data-testid="connect-btn-avatar"
    />
  );
};
