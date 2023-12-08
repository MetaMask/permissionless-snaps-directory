type MockConnectKitProviderProps = {
  children: React.ReactNode;
};

const MockConnectKitProvider: React.FC<MockConnectKitProviderProps> = ({
  children,
}) => {
  return <div className="mock-connectkit-provider">{children}</div>;
};

export { MockConnectKitProvider as ConnectKitProvider };
