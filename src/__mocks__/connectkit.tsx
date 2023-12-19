import type { FunctionComponent, ReactNode } from 'react';

export type MockConnectKitProviderProps = {
  children: ReactNode;
};

export const MockConnectKitProvider: FunctionComponent<
  MockConnectKitProviderProps
> = ({ children }) => {
  return <div className="mock-connectkit-provider">{children}</div>;
};

export type MockConnectKitButtonCustomProps = {
  children: (props: {
    isConnected: boolean;
    show: () => void;
    truncatedAddress: string;
    ensName: string | null;
  }) => ReactNode;
  mockIsConnected?: boolean;
  mockEnsName?: string | null;
};

export const MockConnectKitButtonCustom: FunctionComponent<
  MockConnectKitButtonCustomProps
> = ({ children, mockIsConnected = false, mockEnsName = null }) => {
  return (
    <div className="mock-connectkit-button-custom">
      {children({
        isConnected: mockIsConnected,
        show: jest.fn(),
        truncatedAddress: '0x...',
        ensName: mockEnsName,
      })}
    </div>
  );
};

export const ConnectKitButton = {
  Custom: MockConnectKitButtonCustom,
};
