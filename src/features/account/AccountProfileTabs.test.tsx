import { AccountProfileTabs } from './AccountProfileTabs';
import { render } from '../../utils/test-utils';

describe('AccountProfileTabs', () => {
  it('renders', () => {
    const { queryByTestId } = render(<AccountProfileTabs />);
    expect(queryByTestId('account-profile-tabs')).toBeInTheDocument();
  });
});
