import { ConnectButtonAvatar } from './ConnectButtonAvatar';
import { render } from '../utils/test-utils';

describe('ConnectButtonAvatar', () => {
  describe('when props `isConnected` is false', () => {
    it('renders `MetaMaskIcon`', () => {
      const { getByTestId } = render(
        <ConnectButtonAvatar isConnected={false} isFallback={false} />,
      );

      expect(getByTestId('connect-btn-avatar')).toBeInTheDocument();
    });
  });

  describe('when props `isConnected` is true', () => {
    describe('when props `isFallback` is false', () => {
      it('renders `AvatarIcon`', () => {
        const { getByTestId } = render(
          <ConnectButtonAvatar isConnected={true} isFallback={false} />,
        );

        expect(getByTestId('connect-btn-avatar-connected')).toBeInTheDocument();
      });
    });

    describe('when props `isFallback` is true', () => {
      it('renders `AvatarFallbackIcon`', () => {
        const { getByTestId } = render(
          <ConnectButtonAvatar isConnected={true} isFallback={true} />,
        );

        expect(
          getByTestId('connect-btn-avatar-connected-fallabck'),
        ).toBeInTheDocument();
      });
    });
  });
});
