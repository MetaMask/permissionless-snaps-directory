import { AccountProfileBanner } from './AccountProfileBanner';
import { render } from '../../utils/test-utils';

describe('AccountProfileBanner', () => {
  it('renders', () => {
    const { queryByTestId } = render(<AccountProfileBanner />);
    expect(queryByTestId('account-profile-banner')).toBeInTheDocument();
  });
});
