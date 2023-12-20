import { ConnectButtonAvatar } from './ConnectButtonAvatar';
import { render } from '../utils/test-utils';

describe('ConnectButtonAvatar', () => {
  describe('when props `isConnected` is false', () => {
    it('renders `MetaMaskIcon`', () => {
      const { queryByTestId } = render(
        <ConnectButtonAvatar isConnected={false} />,
      );

      expect(queryByTestId('connect-btn-avatar')).toBeInTheDocument();
    });
  });

  describe('when props `isConnected` is true', () => {
    it('renders null', () => {
      const { container } = render(<ConnectButtonAvatar isConnected={true} />);

      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });
});
