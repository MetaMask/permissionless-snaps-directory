import type { FunctionComponent, ReactNode } from 'react';

type MockConnectKitProviderProps = {
  children: ReactNode;
};

export const ConnectKitProvider: FunctionComponent<
  MockConnectKitProviderProps
> = ({ children }) => {
  return <div className="mock-connectkit-provider">{children}</div>;
};
