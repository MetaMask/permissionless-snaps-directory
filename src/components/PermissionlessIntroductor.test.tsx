import { PermissionlessIntroductory } from './PermissionlessIntroductory';
import { render } from '../utils/test-utils';

describe('PermissionlessIntroductory', () => {
  it('renders', async () => {
    const { queryByText } = render(<PermissionlessIntroductory />);

    expect(
      queryByText(
        'Launching Snaps is our first milestone towards permissionless innovation. Making Snaps distribution permissionless is our next step towards opening up MetaMask as a platform for developers and the community.',
      ),
    ).toBeInTheDocument();
  });
});
