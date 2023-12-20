import type { FunctionComponent } from 'react';

import { MetaMaskIcon } from './icons';

export type ConnectButtonAvatarProps = {
  isConnected: boolean;
  isFallback: boolean;
};

export const ConnectButtonAvatar: FunctionComponent<
  ConnectButtonAvatarProps
> = ({ isConnected, isFallback }) => {
  const width = { base: '0', sm: '1.3rem' };

  // TODO: Add Avatar Icon if Avatar Icon is ready
  if (isConnected) {
    if (isFallback) {
      return null;
    }
    return null;
  }
  return <MetaMaskIcon width={width} data-testid="connect-btn-avatar" />;
};
