import type React from 'react';

export type MockConnectKitProviderProps = {
  children: React.ReactNode;
};

export const MockConnectKitProvider: React.FC<MockConnectKitProviderProps> = ({
  children,
}) => {
  return <div className="mock-connectkit-provider">{children}</div>;
};

export type MockConnectKitButtonCustomProps = {
  children: (props: {
    isConnected: boolean;
    show: () => void;
    truncatedAddress: string;
    ensName: string | null;
  }) => React.ReactNode;
  mockIsConnected?: boolean;
  mockEnsName?: string | null;
};

export const MockConnectKitButtonCustom: React.FC<
  MockConnectKitButtonCustomProps
> = ({ children, mockIsConnected = false, mockEnsName = null }) => {
  return (
    <div className="mock-connectkit-button-custom">
      {children({
        isConnected: mockIsConnected,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        show: () => {},
        truncatedAddress: '0x...',
        ensName: mockEnsName,
      })}
    </div>
  );
};

export const ConnectKitButton = {
  Custom: MockConnectKitButtonCustom,
};
