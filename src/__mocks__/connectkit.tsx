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

export const mockShowModel = jest.fn();

export const mockGetIsConnected = jest.fn().mockReturnValueOnce(false);

export const MockConnectKitButtonCustom: FunctionComponent<
  MockConnectKitButtonCustomProps
> = ({ children }) => {
  return (
    <div className="mock-connectkit-button-custom">
      {children({
        isConnected: mockGetIsConnected(),
        show: mockShowModel,
        truncatedAddress: '0x...',
        ensName: 'fake.ens.name',
      })}
    </div>
  );
};

export const ConnectKitButton = {
  Custom: MockConnectKitButtonCustom,
};

export const ConnectKitProvider = MockConnectKitProvider;
