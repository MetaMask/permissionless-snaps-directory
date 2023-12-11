import { render } from '@testing-library/react';
import { ConnectKitButton } from 'connectkit';

describe('ConnectKitButton.Custom', () => {
  it('renders correctly when not connected', () => {
    const { getByText } = render(
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => (
          <button onClick={show}>
            {isConnected
              ? ensName ?? <span>{truncatedAddress}</span>
              : 'Connect'}
          </button>
        )}
      </ConnectKitButton.Custom>,
    );
    expect(getByText('Connect')).toBeInTheDocument();
  });
});
