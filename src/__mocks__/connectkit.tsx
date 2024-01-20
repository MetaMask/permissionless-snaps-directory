import type { FunctionComponent, ReactNode } from 'react';

export type MockConnectKitProviderProps = {
  children: ReactNode;
};

export const MockConnectKitProvider: FunctionComponent<
  MockConnectKitProviderProps
> = ({ children }) => {
  return <div className="mock-connectkit-provider">{children}</div>;
};

export const ConnectKitProvider = MockConnectKitProvider;
