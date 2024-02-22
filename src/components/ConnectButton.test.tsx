import { ConnectButton } from './ConnectButton';
import { render } from '../utils/test-utils';

describe('ConnectKitButton.Custom', () => {
  it('renders', () => {
    const { queryByText } = render(<ConnectButton />);

    expect(queryByText('Connect')).toBeInTheDocument();
  });
});
